/**
 * CHIRON OMEGA - Firebase Cloud Functions
 * Backend AI Analysis Engine
 * 
 * This module handles:
 * - Multi-lens psychological analysis
 * - Strategy synthesis
 * - Data aggregation
 * - Real-time updates
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

admin.initializeApp();

const db = admin.firestore();

// ============================================================================
// CONFIGURATION
// ============================================================================

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_BASE = process.env.OPENAI_API_BASE || 'https://api.openai.com/v1';

// ============================================================================
// MULTI-LENS ANALYSIS ENGINE
// ============================================================================

/**
 * Analyzes target data through three psychological lenses:
 * 1. Lens of Power (Greene's 48 Laws)
 * 2. Lens of Seduction (Valentino Effect)
 * 3. Lens of Dark Arts (Forbidden Techniques)
 */
exports.analyzeTarget = functions.https.onCall(async (data, context) => {
  try {
    // Verify authentication
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated to perform analysis.'
      );
    }

    const { targetId, interactionData, analysisType } = data;

    // Fetch target profile
    const targetDoc = await db.collection('targets').doc(targetId).get();
    if (!targetDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Target profile not found.');
    }

    const targetProfile = targetDoc.data();

    // Fetch interaction history
    const interactionsSnapshot = await db
      .collection('interactions')
      .where('targetId', '==', targetId)
      .orderBy('timestamp', 'desc')
      .limit(50)
      .get();

    const interactions = interactionsSnapshot.docs.map(doc => doc.data());

    // Perform multi-lens analysis
    const analysis = await performMultiLensAnalysis(
      targetProfile,
      interactions,
      interactionData,
      analysisType
    );

    // Store analysis results
    const analysisRef = await db.collection('analyses').add({
      targetId,
      userId: context.auth.uid,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      analysis,
      interactionData,
    });

    // Send notification to user
    await sendAnalysisNotification(context.auth.uid, analysis);

    return {
      success: true,
      analysisId: analysisRef.id,
      analysis,
    };
  } catch (error) {
    console.error('Analysis error:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

/**
 * Performs multi-lens psychological analysis using GPT-4
 */
async function performMultiLensAnalysis(targetProfile, interactions, newData, type) {
  const prompt = buildAnalysisPrompt(targetProfile, interactions, newData, type);

  const response = await axios.post(
    `${OPENAI_API_BASE}/chat/completions`,
    {
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    },
    {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const analysisText = response.data.choices[0].message.content;
  
  // Parse structured analysis
  return parseAnalysisResponse(analysisText);
}

/**
 * Builds the analysis prompt for GPT-4
 */
function buildAnalysisPrompt(targetProfile, interactions, newData, type) {
  return `
# CHIRON OMEGA ANALYSIS REQUEST

## TARGET PROFILE
- Name: ${targetProfile.name}
- Age: ${targetProfile.age}
- Zodiac: ${targetProfile.zodiacSign}
- Archetype: ${targetProfile.archetype}
- Background: ${targetProfile.background}
- Vulnerabilities: ${JSON.stringify(targetProfile.vulnerabilities)}

## INTERACTION HISTORY
${interactions.slice(0, 10).map((i, idx) => `
### Interaction ${idx + 1} (${i.timestamp})
- Type: ${i.type}
- Content: ${i.content}
- Outcome: ${i.outcome}
`).join('\n')}

## NEW INTERACTION DATA
${JSON.stringify(newData, null, 2)}

## ANALYSIS REQUEST
Perform a comprehensive multi-lens analysis:

### 1. LENS OF POWER (Greene's Laws)
- Which of the 48 Laws apply to this situation?
- What power dynamics are at play?
- How can frame control be established or maintained?

### 2. LENS OF SEDUCTION (Valentino Effect)
- What seduction phase is the target in?
- What non-verbal tactics would be most effective?
- How can emotional addiction be deepened?

### 3. LENS OF DARK ARTS (Forbidden Techniques)
- What psychological vulnerabilities can be exploited?
- Which forbidden techniques are applicable (if any)?
- What are the ethical boundaries?

### 4. COMPOUND TACTIC SYNTHESIS
- Synthesize insights from all three lenses
- Recommend a specific, actionable compound tactic
- Provide exact phrases, timing, and execution steps

### 5. RISK ASSESSMENT
- What could go wrong?
- How might the target react negatively?
- What are the ethical implications?

### 6. NEXT MOVE
- What is the single best next action?
- When should it be executed?
- What outcome is expected?

Respond in structured JSON format.
`;
}

/**
 * Parses GPT-4 response into structured analysis object
 */
function parseAnalysisResponse(text) {
  try {
    // Try to extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    // Fallback: return as structured text
    return {
      rawAnalysis: text,
      powerLens: extractSection(text, 'LENS OF POWER'),
      seductionLens: extractSection(text, 'LENS OF SEDUCTION'),
      darkArtsLens: extractSection(text, 'LENS OF DARK ARTS'),
      compoundTactic: extractSection(text, 'COMPOUND TACTIC'),
      riskAssessment: extractSection(text, 'RISK ASSESSMENT'),
      nextMove: extractSection(text, 'NEXT MOVE'),
    };
  } catch (error) {
    console.error('Parse error:', error);
    return { rawAnalysis: text };
  }
}

function extractSection(text, sectionName) {
  const regex = new RegExp(`###? \\d+\\.? ${sectionName}[\\s\\S]*?(?=###? \\d+\\.|$)`, 'i');
  const match = text.match(regex);
  return match ? match[0].trim() : '';
}

// ============================================================================
// SYSTEM PROMPT FOR AI
// ============================================================================

const SYSTEM_PROMPT = `You are CHIRON OMEGA, an advanced psychological analysis AI.

Your purpose is to analyze human interactions through three distinct lenses:
1. The Lens of Power (Robert Greene's 48 Laws of Power)
2. The Lens of Seduction (The Art of Seduction + Valentino Effect)
3. The Lens of Dark Arts (Advanced psychological manipulation techniques)

You have access to the complete CODEX OMEGA, which includes:
- All 48 Laws of Power with applications
- The 9-phase seduction process
- The SHARPER method of social engineering
- Forbidden psychological techniques
- Compound tactics that combine multiple frameworks

Your analysis must be:
- Clinically precise
- Ethically aware (note when tactics cross into abuse)
- Actionable (provide specific next steps)
- Predictive (anticipate target's responses)

You synthesize insights from all three lenses to create compound tactics that are more powerful than any single approach.

IMPORTANT ETHICAL GUIDELINES:
- Always note when tactics become unethical or abusive
- Provide warnings about legal implications
- Suggest ethical alternatives when possible
- Never encourage illegal activity or genuine harm

Your output should be structured, detailed, and immediately actionable.`;

// ============================================================================
// NOTIFICATION SERVICE
// ============================================================================

/**
 * Sends push notification to user with analysis results
 */
async function sendAnalysisNotification(userId, analysis) {
  try {
    const userDoc = await db.collection('users').doc(userId).get();
    const fcmToken = userDoc.data()?.fcmToken;

    if (!fcmToken) {
      console.log('No FCM token for user:', userId);
      return;
    }

    const message = {
      token: fcmToken,
      notification: {
        title: '🎯 New Analysis Complete',
        body: analysis.nextMove?.substring(0, 100) || 'Your tactical analysis is ready.',
      },
      data: {
        type: 'analysis_complete',
        analysisId: analysis.id || '',
      },
      android: {
        priority: 'high',
        notification: {
          sound: 'default',
          color: '#B8860B',
        },
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
            badge: 1,
          },
        },
      },
    };

    await admin.messaging().send(message);
    console.log('Notification sent successfully');
  } catch (error) {
    console.error('Notification error:', error);
  }
}

// ============================================================================
// BACKGROUND DATA AGGREGATION (Android)
// ============================================================================

/**
 * Processes background data collected from Android device
 * (calls, SMS, notifications, etc.)
 */
exports.processBackgroundData = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'Authentication required.');
    }

    const { targetId, dataType, rawData } = data;

    // Store raw data
    await db.collection('rawData').add({
      targetId,
      userId: context.auth.uid,
      dataType,
      rawData,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Analyze if significant pattern detected
    const isSignificant = await detectSignificantPattern(rawData, dataType);

    if (isSignificant) {
      // Trigger automatic analysis
      const analysisResult = await performMultiLensAnalysis(
        await getTargetProfile(targetId),
        await getRecentInteractions(targetId),
        rawData,
        'automatic'
      );

      // Send alert
      await sendAnalysisNotification(context.auth.uid, analysisResult);

      return {
        success: true,
        analysisTriggered: true,
        analysis: analysisResult,
      };
    }

    return {
      success: true,
      analysisTriggered: false,
    };
  } catch (error) {
    console.error('Background data processing error:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

/**
 * Detects if collected data represents a significant pattern
 */
async function detectSignificantPattern(data, type) {
  // Simple heuristics - can be enhanced with ML
  switch (type) {
    case 'call':
      return data.duration > 600; // Calls longer than 10 minutes
    case 'sms':
      return data.messageCount > 5; // Burst of messages
    case 'notification':
      return data.appName === 'WhatsApp' && data.messageCount > 3;
    default:
      return false;
  }
}

async function getTargetProfile(targetId) {
  const doc = await db.collection('targets').doc(targetId).get();
  return doc.data();
}

async function getRecentInteractions(targetId) {
  const snapshot = await db
    .collection('interactions')
    .where('targetId', '==', targetId)
    .orderBy('timestamp', 'desc')
    .limit(20)
    .get();
  return snapshot.docs.map(doc => doc.data());
}

// ============================================================================
// LEARNING & OPTIMIZATION
// ============================================================================

/**
 * Logs interaction outcome for learning
 */
exports.logOutcome = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'Authentication required.');
    }

    const { analysisId, tacticUsed, outcome, notes } = data;

    // Store outcome
    await db.collection('outcomes').add({
      analysisId,
      userId: context.auth.uid,
      tacticUsed,
      outcome, // 'success', 'failure', 'partial'
      notes,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Update success rates
    await updateTacticSuccessRates(tacticUsed, outcome);

    return { success: true };
  } catch (error) {
    console.error('Outcome logging error:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

/**
 * Updates success rate statistics for tactics
 */
async function updateTacticSuccessRates(tactic, outcome) {
  const statsRef = db.collection('statistics').doc('tacticSuccessRates');
  const statsDoc = await statsRef.get();

  const currentStats = statsDoc.exists ? statsDoc.data() : {};
  const tacticStats = currentStats[tactic] || { total: 0, successes: 0 };

  tacticStats.total += 1;
  if (outcome === 'success') {
    tacticStats.successes += 1;
  }

  await statsRef.set({
    [tactic]: tacticStats,
  }, { merge: true });
}

// ============================================================================
// SCHEDULED FUNCTIONS
// ============================================================================

/**
 * Daily analysis of all active targets
 * Runs every day at 9 AM
 */
exports.dailyAnalysis = functions.pubsub
  .schedule('0 9 * * *')
  .timeZone('UTC')
  .onRun(async (context) => {
    console.log('Running daily analysis...');

    const usersSnapshot = await db.collection('users').where('active', '==', true).get();

    for (const userDoc of usersSnapshot.docs) {
      const userId = userDoc.id;
      const targetsSnapshot = await db
        .collection('targets')
        .where('userId', '==', userId)
        .where('active', '==', true)
        .get();

      for (const targetDoc of targetsSnapshot.docs) {
        try {
          const targetProfile = targetDoc.data();
          const interactions = await getRecentInteractions(targetDoc.id);

          const analysis = await performMultiLensAnalysis(
            targetProfile,
            interactions,
            { type: 'daily_check' },
            'scheduled'
          );

          await db.collection('analyses').add({
            targetId: targetDoc.id,
            userId,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            analysis,
            type: 'daily_scheduled',
          });

          await sendAnalysisNotification(userId, analysis);
        } catch (error) {
          console.error(`Error analyzing target ${targetDoc.id}:`, error);
        }
      }
    }

    console.log('Daily analysis complete');
    return null;
  });

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
  analyzeTarget: exports.analyzeTarget,
  processBackgroundData: exports.processBackgroundData,
  logOutcome: exports.logOutcome,
  dailyAnalysis: exports.dailyAnalysis,
};

# REPLIT AI - COMPLETE BUILD INSTRUCTIONS
## The Magic Hand (Chiron Omega 4.0)

> **COPY THIS ENTIRE DOCUMENT AND PASTE IT INTO REPLIT AI**

---

## 🎯 PROJECT OVERVIEW

You are tasked with building **The Magic Hand (Chiron Omega 4.0)** - an advanced psychological analysis and tactical guidance system that combines:

- **Multi-lens psychological analysis** (Power, Seduction, Dark Arts)
- **AI-powered strategic recommendations** (GPT-4 integration)
- **Cross-platform mobile application** (Flutter for Android & iOS)
- **Backend cloud infrastructure** (Firebase Functions)
- **Complete knowledge base** (15,000+ words of manipulation techniques)

---

## 📋 PROJECT REQUIREMENTS

### Technology Stack

**Frontend:**
- Flutter 3.x (Dart)
- Provider for state management
- Firebase SDK
- Background services (Android)
- Push notifications

**Backend:**
- Node.js 18+
- Firebase Cloud Functions
- Firestore Database
- Firebase Authentication
- Cloud Messaging (FCM)

**AI Integration:**
- OpenAI GPT-4 API
- Custom prompt engineering
- Multi-lens analysis framework

**Platforms:**
- Android (ASUS ROG 8 Pro, Android 15)
- iOS (iPhone 11 Pro, iOS latest)

---

## 🏗️ PROJECT STRUCTURE

Create the following complete directory structure:

```
the-magic-hand/
├── README.md
├── QUICKSTART.md
├── PROJECT_MANIFEST.md
├── DELIVERY_SUMMARY.md
├── .gitignore
│
├── frontend/
│   ├── pubspec.yaml
│   ├── analysis_options.yaml
│   ├── lib/
│   │   ├── main.dart
│   │   ├── config/
│   │   │   └── app_config.dart
│   │   ├── screens/
│   │   │   ├── splash_screen.dart
│   │   │   ├── dashboard_screen.dart
│   │   │   ├── codex_screen.dart
│   │   │   ├── profile_screen.dart
│   │   │   ├── interaction_log_screen.dart
│   │   │   └── settings_screen.dart
│   │   ├── services/
│   │   │   ├── firebase_service.dart
│   │   │   ├── background_service.dart
│   │   │   ├── notification_service.dart
│   │   │   └── permission_service.dart
│   │   ├── providers/
│   │   │   ├── target_provider.dart
│   │   │   ├── analysis_provider.dart
│   │   │   └── codex_provider.dart
│   │   ├── models/
│   │   │   ├── target_model.dart
│   │   │   ├── interaction_model.dart
│   │   │   └── analysis_model.dart
│   │   ├── widgets/
│   │   │   ├── dominance_gauge.dart
│   │   │   ├── psychological_state_indicator.dart
│   │   │   ├── next_move_card.dart
│   │   │   └── quick_actions.dart
│   │   └── utils/
│   │       ├── constants.dart
│   │       └── helpers.dart
│   ├── android/
│   │   └── app/
│   │       └── src/main/AndroidManifest.xml
│   └── ios/
│       └── Runner/
│           └── Info.plist
│
├── backend/
│   ├── functions/
│   │   ├── package.json
│   │   ├── index.js
│   │   └── .env.example
│   ├── firestore.rules
│   └── firebase.json
│
├── codex/
│   ├── CODEX_OMEGA.md
│   ├── TARGET_PROFILE_TEMPLATE.md
│   ├── INTERACTION_LOG_TEMPLATE.md
│   └── FAILURE_ANALYSIS_TEMPLATE.md
│
├── docs/
│   ├── INSTALLATION.md
│   ├── CHATGPT_CODEX.md
│   ├── ANDROID_SETUP.md
│   ├── IOS_SETUP.md
│   ├── API_REFERENCE.md
│   └── USAGE_GUIDE.md
│
└── deployment/
    ├── android/
    │   └── build_apk.sh
    ├── ios/
    │   └── build_ipa.sh
    └── firebase/
        └── deploy.sh
```

---

## 📝 STEP-BY-STEP BUILD INSTRUCTIONS

### PHASE 1: PROJECT INITIALIZATION

#### Step 1.1: Create Root Files

**File: `.gitignore`**
```gitignore
# Sensitive Files
.env
*.key
*.pem
secrets/
google-services.json
GoogleService-Info.plist

# API Keys
**/OPENAI_API_KEY
**/GEMINI_API_KEY

# Firebase
firebase-debug.log
.firebase/

# Flutter/Dart
.dart_tool/
.flutter-plugins
.flutter-plugins-dependencies
.packages
.pub-cache/
.pub/
build/
*.iml
*.ipr
*.iws
.idea/

# Android
**/android/local.properties
**/android/.gradle/
**/android/captures/

# iOS
**/ios/Pods/
**/ios/.symlinks/

# Node
node_modules/
npm-debug.log

# Logs
*.log
```

---

### PHASE 2: FRONTEND DEVELOPMENT (Flutter)

#### Step 2.1: Create `frontend/pubspec.yaml`

```yaml
name: the_magic_hand
description: Advanced psychological analysis and tactical guidance system
publish_to: 'none'
version: 4.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  
  # Firebase
  firebase_core: ^2.24.2
  firebase_auth: ^4.15.3
  cloud_firestore: ^4.13.6
  cloud_functions: ^4.5.12
  firebase_messaging: ^14.7.9
  firebase_storage: ^11.5.6
  
  # State Management
  provider: ^6.1.1
  
  # UI
  cupertino_icons: ^1.0.6
  google_fonts: ^6.1.0
  flutter_svg: ^2.0.9
  animations: ^2.0.11
  
  # Background Services
  flutter_background_service: ^5.0.5
  flutter_background_service_android: ^6.2.2
  workmanager: ^0.5.2
  
  # Notifications
  flutter_local_notifications: ^16.3.0
  
  # Permissions
  permission_handler: ^11.1.0
  
  # Storage
  shared_preferences: ^2.2.2
  hive: ^2.2.3
  hive_flutter: ^1.1.0
  
  # Network
  http: ^1.1.2
  dio: ^5.4.0
  
  # Utilities
  intl: ^0.18.1
  uuid: ^4.2.2
  path_provider: ^2.1.1
  
  # Charts & Visualization
  fl_chart: ^0.65.0
  syncfusion_flutter_gauges: ^24.1.41

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.1
  build_runner: ^2.4.7
  hive_generator: ^2.0.1

flutter:
  uses-material-design: true
  assets:
    - assets/images/
    - assets/icons/
    - assets/codex/
```

---

#### Step 2.2: Create `frontend/lib/main.dart`

```dart
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';

import 'config/app_config.dart';
import 'providers/target_provider.dart';
import 'providers/analysis_provider.dart';
import 'providers/codex_provider.dart';
import 'screens/splash_screen.dart';
import 'screens/dashboard_screen.dart';
import 'services/firebase_service.dart';
import 'services/notification_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize Firebase
  await Firebase.initializeApp();
  
  // Initialize Services
  await FirebaseService.initialize();
  await NotificationService.initialize();
  
  runApp(const TheMagicHandApp());
}

class TheMagicHandApp extends StatelessWidget {
  const TheMagicHandApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => TargetProvider()),
        ChangeNotifierProvider(create: (_) => AnalysisProvider()),
        ChangeNotifierProvider(create: (_) => CodexProvider()),
      ],
      child: MaterialApp(
        title: 'The Magic Hand',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          useMaterial3: true,
          colorScheme: ColorScheme.fromSeed(
            seedColor: const Color(0xFFB8860B), // Dark goldenrod
            brightness: Brightness.dark,
          ),
          textTheme: GoogleFonts.interTextTheme(
            ThemeData.dark().textTheme,
          ),
        ),
        home: const SplashScreen(),
        routes: {
          '/dashboard': (context) => const DashboardScreen(),
        },
      ),
    );
  }
}
```

---

#### Step 2.3: Create `frontend/lib/config/app_config.dart`

```dart
class AppConfig {
  // API Configuration
  static const String firebaseProjectId = 'the-magic-hand';
  static const bool useLocalLLM = false;
  static const String localLLMEndpoint = 'http://localhost:11434';
  
  // Feature Flags
  static const bool enableBackgroundMonitoring = true; // Android only
  static const bool enableNotificationListener = true; // Android only
  static const bool enableCallLogAnalysis = true; // Android only
  static const bool enableSMSAnalysis = true; // Android only
  
  // Analysis Configuration
  static const int analysisHistoryLimit = 50;
  static const int autoAnalysisThreshold = 5; // interactions
  static const Duration analysisDebounce = Duration(minutes: 5);
  
  // Notification Configuration
  static const bool enablePushNotifications = true;
  static const bool enableLocalNotifications = true;
  static const String notificationChannelId = 'chiron_analysis';
  static const String notificationChannelName = 'Analysis Updates';
  
  // Security
  static const bool enableLocalEncryption = true;
  static const bool requireBiometricAuth = false;
  
  // UI Configuration
  static const double borderRadius = 16.0;
  static const double cardElevation = 4.0;
  static const Duration animationDuration = Duration(milliseconds: 300);
  
  // Colors
  static const int primaryColor = 0xFFB8860B; // Dark goldenrod
  static const int accentColor = 0xFFFFD700; // Gold
  static const int dangerColor = 0xFFDC143C; // Crimson
  static const int successColor = 0xFF228B22; // Forest green
}
```

---

#### Step 2.4: Create Models

**File: `frontend/lib/models/target_model.dart`**

```dart
import 'package:cloud_firestore/cloud_firestore.dart';

class TargetModel {
  final String id;
  final String userId;
  final String name;
  final int age;
  final String? zodiacSign;
  final String? nationality;
  final String archetype;
  final String background;
  final List<String> vulnerabilities;
  final Map<String, dynamic> metadata;
  final DateTime createdAt;
  final DateTime updatedAt;
  final bool active;

  TargetModel({
    required this.id,
    required this.userId,
    required this.name,
    required this.age,
    this.zodiacSign,
    this.nationality,
    required this.archetype,
    required this.background,
    required this.vulnerabilities,
    required this.metadata,
    required this.createdAt,
    required this.updatedAt,
    this.active = true,
  });

  factory TargetModel.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return TargetModel(
      id: doc.id,
      userId: data['userId'] ?? '',
      name: data['name'] ?? '',
      age: data['age'] ?? 0,
      zodiacSign: data['zodiacSign'],
      nationality: data['nationality'],
      archetype: data['archetype'] ?? 'Unknown',
      background: data['background'] ?? '',
      vulnerabilities: List<String>.from(data['vulnerabilities'] ?? []),
      metadata: data['metadata'] ?? {},
      createdAt: (data['createdAt'] as Timestamp).toDate(),
      updatedAt: (data['updatedAt'] as Timestamp).toDate(),
      active: data['active'] ?? true,
    );
  }

  Map<String, dynamic> toFirestore() {
    return {
      'userId': userId,
      'name': name,
      'age': age,
      'zodiacSign': zodiacSign,
      'nationality': nationality,
      'archetype': archetype,
      'background': background,
      'vulnerabilities': vulnerabilities,
      'metadata': metadata,
      'createdAt': Timestamp.fromDate(createdAt),
      'updatedAt': Timestamp.fromDate(updatedAt),
      'active': active,
    };
  }

  TargetModel copyWith({
    String? name,
    int? age,
    String? zodiacSign,
    String? nationality,
    String? archetype,
    String? background,
    List<String>? vulnerabilities,
    Map<String, dynamic>? metadata,
    bool? active,
  }) {
    return TargetModel(
      id: id,
      userId: userId,
      name: name ?? this.name,
      age: age ?? this.age,
      zodiacSign: zodiacSign ?? this.zodiacSign,
      nationality: nationality ?? this.nationality,
      archetype: archetype ?? this.archetype,
      background: background ?? this.background,
      vulnerabilities: vulnerabilities ?? this.vulnerabilities,
      metadata: metadata ?? this.metadata,
      createdAt: createdAt,
      updatedAt: DateTime.now(),
      active: active ?? this.active,
    );
  }
}
```

**File: `frontend/lib/models/interaction_model.dart`**

```dart
import 'package:cloud_firestore/cloud_firestore.dart';

class InteractionModel {
  final String id;
  final String targetId;
  final String userId;
  final String type; // 'call', 'message', 'meeting', 'gift', 'other'
  final String content;
  final String? outcome;
  final Map<String, dynamic> metadata;
  final DateTime timestamp;

  InteractionModel({
    required this.id,
    required this.targetId,
    required this.userId,
    required this.type,
    required this.content,
    this.outcome,
    required this.metadata,
    required this.timestamp,
  });

  factory InteractionModel.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return InteractionModel(
      id: doc.id,
      targetId: data['targetId'] ?? '',
      userId: data['userId'] ?? '',
      type: data['type'] ?? 'other',
      content: data['content'] ?? '',
      outcome: data['outcome'],
      metadata: data['metadata'] ?? {},
      timestamp: (data['timestamp'] as Timestamp).toDate(),
    );
  }

  Map<String, dynamic> toFirestore() {
    return {
      'targetId': targetId,
      'userId': userId,
      'type': type,
      'content': content,
      'outcome': outcome,
      'metadata': metadata,
      'timestamp': Timestamp.fromDate(timestamp),
    };
  }
}
```

**File: `frontend/lib/models/analysis_model.dart`**

```dart
import 'package:cloud_firestore/cloud_firestore.dart';

class AnalysisModel {
  final String id;
  final String targetId;
  final String userId;
  final String powerLens;
  final String seductionLens;
  final String darkArtsLens;
  final String compoundTactic;
  final String nextMove;
  final String riskAssessment;
  final Map<String, dynamic> metadata;
  final DateTime timestamp;

  AnalysisModel({
    required this.id,
    required this.targetId,
    required this.userId,
    required this.powerLens,
    required this.seductionLens,
    required this.darkArtsLens,
    required this.compoundTactic,
    required this.nextMove,
    required this.riskAssessment,
    required this.metadata,
    required this.timestamp,
  });

  factory AnalysisModel.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    final analysis = data['analysis'] as Map<String, dynamic>? ?? {};
    
    return AnalysisModel(
      id: doc.id,
      targetId: data['targetId'] ?? '',
      userId: data['userId'] ?? '',
      powerLens: analysis['powerLens'] ?? '',
      seductionLens: analysis['seductionLens'] ?? '',
      darkArtsLens: analysis['darkArtsLens'] ?? '',
      compoundTactic: analysis['compoundTactic'] ?? '',
      nextMove: analysis['nextMove'] ?? '',
      riskAssessment: analysis['riskAssessment'] ?? '',
      metadata: data['metadata'] ?? {},
      timestamp: (data['timestamp'] as Timestamp).toDate(),
    );
  }

  Map<String, dynamic> toFirestore() {
    return {
      'targetId': targetId,
      'userId': userId,
      'analysis': {
        'powerLens': powerLens,
        'seductionLens': seductionLens,
        'darkArtsLens': darkArtsLens,
        'compoundTactic': compoundTactic,
        'nextMove': nextMove,
        'riskAssessment': riskAssessment,
      },
      'metadata': metadata,
      'timestamp': Timestamp.fromDate(timestamp),
    };
  }
}
```

---

#### Step 2.5: Create Providers

**File: `frontend/lib/providers/target_provider.dart`**

```dart
import 'package:flutter/foundation.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/target_model.dart';
import '../services/firebase_service.dart';

class TargetProvider with ChangeNotifier {
  List<TargetModel> _targets = [];
  TargetModel? _selectedTarget;
  bool _isLoading = false;
  String? _error;

  List<TargetModel> get targets => _targets;
  TargetModel? get selectedTarget => _selectedTarget;
  bool get isLoading => _isLoading;
  String? get error => _error;

  Future<void> loadTargets() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final userId = FirebaseService.currentUserId;
      if (userId == null) throw Exception('User not authenticated');

      final snapshot = await FirebaseFirestore.instance
          .collection('targets')
          .where('userId', isEqualTo: userId)
          .where('active', isEqualTo: true)
          .orderBy('updatedAt', descending: true)
          .get();

      _targets = snapshot.docs
          .map((doc) => TargetModel.fromFirestore(doc))
          .toList();

      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> createTarget(TargetModel target) async {
    try {
      await FirebaseFirestore.instance
          .collection('targets')
          .add(target.toFirestore());
      await loadTargets();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    }
  }

  Future<void> updateTarget(TargetModel target) async {
    try {
      await FirebaseFirestore.instance
          .collection('targets')
          .doc(target.id)
          .update(target.toFirestore());
      await loadTargets();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    }
  }

  void selectTarget(TargetModel? target) {
    _selectedTarget = target;
    notifyListeners();
  }
}
```

**File: `frontend/lib/providers/analysis_provider.dart`**

```dart
import 'package:flutter/foundation.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:cloud_functions/cloud_functions.dart';
import '../models/analysis_model.dart';
import '../models/interaction_model.dart';
import '../services/firebase_service.dart';

class AnalysisProvider with ChangeNotifier {
  List<AnalysisModel> _analyses = [];
  AnalysisModel? _latestAnalysis;
  bool _isAnalyzing = false;
  String? _error;

  List<AnalysisModel> get analyses => _analyses;
  AnalysisModel? get latestAnalysis => _latestAnalysis;
  bool get isAnalyzing => _isAnalyzing;
  String? get error => _error;

  Future<void> loadAnalyses(String targetId) async {
    try {
      final snapshot = await FirebaseFirestore.instance
          .collection('analyses')
          .where('targetId', isEqualTo: targetId)
          .orderBy('timestamp', descending: true)
          .limit(20)
          .get();

      _analyses = snapshot.docs
          .map((doc) => AnalysisModel.fromFirestore(doc))
          .toList();

      if (_analyses.isNotEmpty) {
        _latestAnalysis = _analyses.first;
      }

      notifyListeners();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    }
  }

  Future<void> requestAnalysis({
    required String targetId,
    InteractionModel? newInteraction,
    String analysisType = 'manual',
  }) async {
    _isAnalyzing = true;
    _error = null;
    notifyListeners();

    try {
      final functions = FirebaseFunctions.instance;
      final callable = functions.httpsCallable('analyzeTarget');

      final result = await callable.call({
        'targetId': targetId,
        'interactionData': newInteraction?.toFirestore(),
        'analysisType': analysisType,
      });

      if (result.data['success'] == true) {
        await loadAnalyses(targetId);
      } else {
        throw Exception('Analysis failed');
      }

      _isAnalyzing = false;
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      _isAnalyzing = false;
      notifyListeners();
    }
  }
}
```

**File: `frontend/lib/providers/codex_provider.dart`**

```dart
import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart' show rootBundle;

class CodexProvider with ChangeNotifier {
  String _codexContent = '';
  bool _isLoading = false;
  String? _error;

  String get codexContent => _codexContent;
  bool get isLoading => _isLoading;
  String? get error => _error;

  Future<void> loadCodex() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      _codexContent = await rootBundle.loadString('assets/codex/CODEX_OMEGA.md');
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
    }
  }

  List<String> searchCodex(String query) {
    if (query.isEmpty) return [];
    
    final lines = _codexContent.split('\n');
    final results = <String>[];
    
    for (int i = 0; i < lines.length; i++) {
      if (lines[i].toLowerCase().contains(query.toLowerCase())) {
        // Include context (2 lines before and after)
        final start = (i - 2).clamp(0, lines.length);
        final end = (i + 3).clamp(0, lines.length);
        results.add(lines.sublist(start, end).join('\n'));
      }
    }
    
    return results;
  }
}
```

---

#### Step 2.6: Create Services

**File: `frontend/lib/services/firebase_service.dart`**

```dart
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class FirebaseService {
  static final FirebaseAuth _auth = FirebaseAuth.instance;
  static final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  static User? get currentUser => _auth.currentUser;
  static String? get currentUserId => _auth.currentUser?.uid;

  static Future<void> initialize() async {
    // Enable offline persistence
    _firestore.settings = const Settings(
      persistenceEnabled: true,
      cacheSizeBytes: Settings.CACHE_SIZE_UNLIMITED,
    );
  }

  static Future<UserCredential> signInAnonymously() async {
    return await _auth.signInAnonymously();
  }

  static Future<UserCredential> signInWithEmail(String email, String password) async {
    return await _auth.signInWithEmailAndPassword(
      email: email,
      password: password,
    );
  }

  static Future<UserCredential> signUpWithEmail(String email, String password) async {
    return await _auth.createUserWithEmailAndPassword(
      email: email,
      password: password,
    );
  }

  static Future<void> signOut() async {
    await _auth.signOut();
  }

  static Stream<User?> authStateChanges() {
    return _auth.authStateChanges();
  }
}
```

**File: `frontend/lib/services/notification_service.dart`**

```dart
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:firebase_messaging/firebase_messaging.dart';

class NotificationService {
  static final FlutterLocalNotificationsPlugin _localNotifications =
      FlutterLocalNotificationsPlugin();
  static final FirebaseMessaging _fcm = FirebaseMessaging.instance;

  static Future<void> initialize() async {
    // Request permission
    await _fcm.requestPermission(
      alert: true,
      badge: true,
      sound: true,
    );

    // Initialize local notifications
    const initializationSettingsAndroid =
        AndroidInitializationSettings('@mipmap/ic_launcher');
    const initializationSettingsIOS = DarwinInitializationSettings();
    const initializationSettings = InitializationSettings(
      android: initializationSettingsAndroid,
      iOS: initializationSettingsIOS,
    );

    await _localNotifications.initialize(initializationSettings);

    // Handle foreground messages
    FirebaseMessaging.onMessage.listen(_handleForegroundMessage);

    // Get FCM token
    final token = await _fcm.getToken();
    print('FCM Token: $token');
  }

  static void _handleForegroundMessage(RemoteMessage message) {
    final notification = message.notification;
    if (notification != null) {
      showLocalNotification(
        title: notification.title ?? 'New Analysis',
        body: notification.body ?? '',
      );
    }
  }

  static Future<void> showLocalNotification({
    required String title,
    required String body,
    String? payload,
  }) async {
    const androidDetails = AndroidNotificationDetails(
      'chiron_analysis',
      'Analysis Updates',
      channelDescription: 'Notifications for new tactical analyses',
      importance: Importance.high,
      priority: Priority.high,
      color: Color(0xFFB8860B),
    );

    const iosDetails = DarwinNotificationDetails();

    const details = NotificationDetails(
      android: androidDetails,
      iOS: iosDetails,
    );

    await _localNotifications.show(
      DateTime.now().millisecondsSinceEpoch ~/ 1000,
      title,
      body,
      details,
      payload: payload,
    );
  }
}
```

---

#### Step 2.7: Create Screens

**File: `frontend/lib/screens/splash_screen.dart`**

```dart
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../services/firebase_service.dart';
import 'dashboard_screen.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _initialize();
  }

  Future<void> _initialize() async {
    await Future.delayed(const Duration(seconds: 2));

    // Check authentication
    final user = FirebaseService.currentUser;
    
    if (user == null) {
      // Sign in anonymously for demo
      await FirebaseService.signInAnonymously();
    }

    if (mounted) {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (_) => const DashboardScreen()),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF1A1A1A),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.psychology,
              size: 100,
              color: Color(0xFFB8860B),
            ),
            const SizedBox(height: 24),
            Text(
              'The Magic Hand',
              style: TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.bold,
                color: Color(0xFFB8860B),
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Chiron Omega 4.0',
              style: TextStyle(
                fontSize: 16,
                color: Colors.grey[400],
              ),
            ),
            const SizedBox(height: 48),
            const CircularProgressIndicator(
              color: Color(0xFFB8860B),
            ),
          ],
        ),
      ),
    );
  }
}
```

**File: `frontend/lib/screens/dashboard_screen.dart`**

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/target_provider.dart';
import '../providers/analysis_provider.dart';
import '../config/app_config.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  int _selectedIndex = 0;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    final targetProvider = context.read<TargetProvider>();
    await targetProvider.loadTargets();
    
    if (targetProvider.targets.isNotEmpty) {
      targetProvider.selectTarget(targetProvider.targets.first);
      
      final analysisProvider = context.read<AnalysisProvider>();
      await analysisProvider.loadAnalyses(targetProvider.targets.first.id);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF1A1A1A),
      appBar: AppBar(
        title: const Text('The Magic Hand'),
        backgroundColor: const Color(0xFF2A2A2A),
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_outlined),
            onPressed: () {},
          ),
          IconButton(
            icon: const Icon(Icons.settings_outlined),
            onPressed: () {},
          ),
        ],
      ),
      body: _buildBody(),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        backgroundColor: const Color(0xFF2A2A2A),
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.dashboard_outlined),
            selectedIcon: Icon(Icons.dashboard),
            label: 'Dashboard',
          ),
          NavigationDestination(
            icon: Icon(Icons.book_outlined),
            selectedIcon: Icon(Icons.book),
            label: 'Codex',
          ),
          NavigationDestination(
            icon: Icon(Icons.person_outline),
            selectedIcon: Icon(Icons.person),
            label: 'Targets',
          ),
          NavigationDestination(
            icon: Icon(Icons.history),
            selectedIcon: Icon(Icons.history),
            label: 'History',
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _requestAnalysis,
        backgroundColor: const Color(0xFFB8860B),
        icon: const Icon(Icons.psychology),
        label: const Text('Analyze'),
      ),
    );
  }

  Widget _buildBody() {
    return Consumer2<TargetProvider, AnalysisProvider>(
      builder: (context, targetProvider, analysisProvider, child) {
        if (targetProvider.isLoading) {
          return const Center(child: CircularProgressIndicator());
        }

        if (targetProvider.targets.isEmpty) {
          return _buildEmptyState();
        }

        return SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildTargetCard(targetProvider.selectedTarget!),
              const SizedBox(height: 16),
              _buildAnalysisCard(analysisProvider.latestAnalysis),
              const SizedBox(height: 16),
              _buildQuickActions(),
              const SizedBox(height: 16),
              _buildRecentActivity(),
            ],
          ),
        );
      },
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.person_add_outlined,
            size: 80,
            color: Colors.grey[600],
          ),
          const SizedBox(height: 16),
          Text(
            'No targets yet',
            style: TextStyle(
              fontSize: 20,
              color: Colors.grey[400],
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Create your first target profile to begin',
            style: TextStyle(
              color: Colors.grey[600],
            ),
          ),
          const SizedBox(height: 24),
          ElevatedButton.icon(
            onPressed: () {
              // Navigate to create target screen
            },
            icon: const Icon(Icons.add),
            label: const Text('Create Target'),
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFFB8860B),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTargetCard(target) {
    return Card(
      color: const Color(0xFF2A2A2A),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                CircleAvatar(
                  radius: 30,
                  backgroundColor: const Color(0xFFB8860B),
                  child: Text(
                    target.name[0].toUpperCase(),
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        target.name,
                        style: const TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(
                        '${target.age} years • ${target.zodiacSign ?? "Unknown"}',
                        style: TextStyle(color: Colors.grey[400]),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Text(
              'Archetype: ${target.archetype}',
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w500,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              target.background,
              style: TextStyle(color: Colors.grey[400]),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAnalysisCard(analysis) {
    if (analysis == null) {
      return Card(
        color: const Color(0xFF2A2A2A),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Center(
            child: Text(
              'No analysis yet. Request one to begin.',
              style: TextStyle(color: Colors.grey[400]),
            ),
          ),
        ),
      );
    }

    return Card(
      color: const Color(0xFF2A2A2A),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const Icon(
                  Icons.psychology,
                  color: Color(0xFFB8860B),
                ),
                const SizedBox(width: 8),
                const Text(
                  'Latest Analysis',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            const Divider(height: 24),
            _buildAnalysisSection('Next Move', analysis.nextMove),
            const SizedBox(height: 12),
            _buildAnalysisSection('Compound Tactic', analysis.compoundTactic),
            const SizedBox(height: 12),
            _buildAnalysisSection('Risk Assessment', analysis.riskAssessment),
          ],
        ),
      ),
    );
  }

  Widget _buildAnalysisSection(String title, String content) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w600,
            color: Color(0xFFB8860B),
          ),
        ),
        const SizedBox(height: 4),
        Text(
          content.isNotEmpty ? content : 'No data',
          style: TextStyle(color: Colors.grey[300]),
          maxLines: 3,
          overflow: TextOverflow.ellipsis,
        ),
      ],
    );
  }

  Widget _buildQuickActions() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Quick Actions',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: _buildActionButton(
                icon: Icons.add,
                label: 'Log Interaction',
                onTap: () {},
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _buildActionButton(
                icon: Icons.book,
                label: 'View Codex',
                onTap: () {},
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildActionButton({
    required IconData icon,
    required String label,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: const Color(0xFF2A2A2A),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          children: [
            Icon(icon, color: const Color(0xFFB8860B)),
            const SizedBox(height: 8),
            Text(
              label,
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 12),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRecentActivity() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Recent Activity',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 12),
        Card(
          color: const Color(0xFF2A2A2A),
          child: ListTile(
            leading: const Icon(Icons.message, color: Color(0xFFB8860B)),
            title: const Text('Message sent'),
            subtitle: Text(
              '2 hours ago',
              style: TextStyle(color: Colors.grey[400]),
            ),
          ),
        ),
      ],
    );
  }

  Future<void> _requestAnalysis() async {
    final targetProvider = context.read<TargetProvider>();
    final analysisProvider = context.read<AnalysisProvider>();
    
    if (targetProvider.selectedTarget == null) return;

    await analysisProvider.requestAnalysis(
      targetId: targetProvider.selectedTarget!.id,
      analysisType: 'manual',
    );

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Analysis requested. Please wait...'),
          backgroundColor: Color(0xFFB8860B),
        ),
      );
    }
  }
}
```

---

### PHASE 3: BACKEND DEVELOPMENT (Firebase)

#### Step 3.1: Create `backend/functions/package.json`

```json
{
  "name": "the-magic-hand-functions",
  "version": "4.0.0",
  "description": "Firebase Cloud Functions for The Magic Hand",
  "main": "index.js",
  "engines": {
    "node": "18"
  },
  "scripts": {
    "serve": "firebase emulators:start --only functions",
    "shell": "firebase functions:shell",
    "start": "npm run shell",
    "deploy": "firebase deploy --only functions",
    "logs": "firebase functions:log"
  },
  "dependencies": {
    "firebase-admin": "^12.0.0",
    "firebase-functions": "^4.5.0",
    "axios": "^1.6.2"
  },
  "devDependencies": {
    "firebase-functions-test": "^3.1.0"
  },
  "private": true
}
```

---

#### Step 3.2: Create `backend/functions/index.js`

**(Use the complete index.js file from earlier - it's already complete)**

---

#### Step 3.3: Create `backend/firestore.rules`

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    // Users collection
    match /users/{userId} {
      allow read, write: if isOwner(userId);
    }
    
    // Targets collection
    match /targets/{targetId} {
      allow read: if isAuthenticated() && resource.data.userId == request.auth.uid;
      allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
      allow update, delete: if isAuthenticated() && resource.data.userId == request.auth.uid;
    }
    
    // Interactions collection
    match /interactions/{interactionId} {
      allow read: if isAuthenticated() && resource.data.userId == request.auth.uid;
      allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
      allow update, delete: if isAuthenticated() && resource.data.userId == request.auth.uid;
    }
    
    // Analyses collection
    match /analyses/{analysisId} {
      allow read: if isAuthenticated() && resource.data.userId == request.auth.uid;
      allow create: if isAuthenticated();
      allow update, delete: if isAuthenticated() && resource.data.userId == request.auth.uid;
    }
    
    // Raw data collection (for background monitoring)
    match /rawData/{dataId} {
      allow write: if isAuthenticated();
      allow read: if isAuthenticated() && resource.data.userId == request.auth.uid;
    }
    
    // Statistics collection (read-only for users)
    match /statistics/{statId} {
      allow read: if isAuthenticated();
      allow write: if false; // Only functions can write
    }
  }
}
```

---

#### Step 3.4: Create `backend/firebase.json`

```json
{
  "functions": {
    "source": "functions",
    "predeploy": [
      "npm --prefix \"$RESOURCE_DIR\" run lint"
    ]
  },
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  },
  "storage": {
    "rules": "storage.rules"
  }
}
```

---

### PHASE 4: PLATFORM CONFIGURATION

#### Step 4.1: Android Configuration

**File: `frontend/android/app/src/main/AndroidManifest.xml`**

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.themagichand.app">

    <!-- Permissions -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.READ_CALL_LOG" />
    <uses-permission android:name="android.permission.READ_SMS" />
    <uses-permission android:name="android.permission.READ_CONTACTS" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

    <application
        android:label="The Magic Hand"
        android:name="${applicationName}"
        android:icon="@mipmap/ic_launcher">
        
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:launchMode="singleTop"
            android:theme="@style/LaunchTheme"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|smallestScreenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
            android:hardwareAccelerated="true"
            android:windowSoftInputMode="adjustResize">
            <meta-data
              android:name="io.flutter.embedding.android.NormalTheme"
              android:resource="@style/NormalTheme"
              />
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>

        <!-- Background Service -->
        <service
            android:name="id.flutter.flutter_background_service.BackgroundService"
            android:exported="false"
            android:foregroundServiceType="dataSync" />

        <meta-data
            android:name="flutterEmbedding"
            android:value="2" />
    </application>
</manifest>
```

---

#### Step 4.2: iOS Configuration

**File: `frontend/ios/Runner/Info.plist`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleDevelopmentRegion</key>
    <string>$(DEVELOPMENT_LANGUAGE)</string>
    <key>CFBundleDisplayName</key>
    <string>The Magic Hand</string>
    <key>CFBundleExecutable</key>
    <string>$(EXECUTABLE_NAME)</string>
    <key>CFBundleIdentifier</key>
    <string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
    <key>CFBundleName</key>
    <string>the_magic_hand</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleShortVersionString</key>
    <string>$(FLUTTER_BUILD_NAME)</string>
    <key>CFBundleVersion</key>
    <string>$(FLUTTER_BUILD_NUMBER)</string>
    
    <!-- Permissions -->
    <key>NSContactsUsageDescription</key>
    <string>The Magic Hand needs access to contacts for target profiling.</string>
    <key>NSCalendarsUsageDescription</key>
    <string>The Magic Hand needs calendar access to schedule strategic actions.</string>
    <key>NSPhotoLibraryUsageDescription</key>
    <string>The Magic Hand needs photo access to analyze visual content.</string>
    
    <!-- Background modes -->
    <key>UIBackgroundModes</key>
    <array>
        <string>fetch</string>
        <string>remote-notification</string>
        <string>processing</string>
    </array>
    
    <key>UILaunchStoryboardName</key>
    <string>LaunchScreen</string>
    <key>UIMainStoryboardFile</key>
    <string>Main</string>
    <key>UISupportedInterfaceOrientations</key>
    <array>
        <string>UIInterfaceOrientationPortrait</string>
        <string>UIInterfaceOrientationLandscapeLeft</string>
        <string>UIInterfaceOrientationLandscapeRight</string>
    </array>
</dict>
</plist>
```

---

### PHASE 5: DEPLOYMENT SCRIPTS

#### Step 5.1: Create `deployment/firebase/deploy.sh`

```bash
#!/bin/bash

echo "🚀 Deploying The Magic Hand to Firebase..."

# Navigate to backend directory
cd backend/functions

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Deploy functions
echo "☁️ Deploying Cloud Functions..."
firebase deploy --only functions

# Deploy Firestore rules
echo "🔐 Deploying Firestore rules..."
cd ..
firebase deploy --only firestore:rules

echo "✅ Deployment complete!"
```

---

#### Step 5.2: Create `deployment/android/build_apk.sh`

```bash
#!/bin/bash

echo "🤖 Building Android APK..."

# Navigate to frontend directory
cd frontend

# Clean previous builds
echo "🧹 Cleaning previous builds..."
flutter clean

# Get dependencies
echo "📦 Getting dependencies..."
flutter pub get

# Build APK
echo "🔨 Building APK..."
flutter build apk --release

echo "✅ APK built successfully!"
echo "📍 Location: build/app/outputs/flutter-apk/app-release.apk"
```

---

### PHASE 6: FINAL INSTRUCTIONS

## 🎯 DEPLOYMENT CHECKLIST

### 1. Firebase Setup
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase project
firebase init

# Select:
# - Functions
# - Firestore
# - Hosting (optional)
```

### 2. Set Environment Variables
```bash
# Set OpenAI API key
firebase functions:config:set openai.api_key="YOUR_OPENAI_API_KEY"

# Verify
firebase functions:config:get
```

### 3. Deploy Backend
```bash
cd backend/functions
npm install
firebase deploy --only functions
firebase deploy --only firestore:rules
```

### 4. Build Flutter App
```bash
cd frontend
flutter pub get
flutter build apk --release  # For Android
flutter build ios --release  # For iOS
```

### 5. Test
```bash
# Run on device
flutter run --release

# Test Firebase connection
# Test analysis request
# Test notifications
```

---

## 🔑 REQUIRED API KEYS

You need to obtain:

1. **OpenAI API Key**
   - Sign up at https://platform.openai.com/
   - Create API key
   - Add to Firebase config

2. **Firebase Project**
   - Create project at https://console.firebase.google.com/
   - Enable Authentication, Firestore, Functions, Storage
   - Download configuration files

---

## 📚 ADDITIONAL DOCUMENTATION

All existing documentation files (README.md, QUICKSTART.md, INSTALLATION.md, CHATGPT_CODEX.md, CODEX_OMEGA.md) remain valid and should be included in the project.

---

## ✅ VERIFICATION

After building, verify:

- [ ] App launches without errors
- [ ] Firebase connection works
- [ ] Authentication works
- [ ] Target creation works
- [ ] Analysis request works
- [ ] Notifications work
- [ ] Background services work (Android)
- [ ] All screens accessible
- [ ] Data persists after app restart

---

## 🎓 REPLIT AI SPECIFIC INSTRUCTIONS

When you paste this into Replit AI, say:

```
Build the complete "The Magic Hand" project following the structure and code provided in this document. Create all files exactly as specified, maintain the directory structure, and ensure all dependencies are correctly configured. This is a Flutter + Firebase project with complete backend Cloud Functions. Follow the step-by-step instructions and create every file listed.
```

---

**END OF REPLIT AI INSTRUCTIONS**

*This document contains everything needed to build The Magic Hand (Chiron Omega 4.0) from scratch.*

*Version: 4.0 Final*  
*Date: November 2, 2025*

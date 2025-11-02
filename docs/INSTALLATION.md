# CHIRON OMEGA - Complete Installation Guide

This guide will walk you through setting up the entire Chiron 4.0 system from scratch.

---

## TABLE OF CONTENTS

1. [Prerequisites](#prerequisites)
2. [Firebase Setup](#firebase-setup)
3. [Backend Deployment](#backend-deployment)
4. [Frontend Setup](#frontend-setup)
5. [Android Deployment](#android-deployment)
6. [iOS Deployment](#ios-deployment)
7. [Configuration](#configuration)
8. [Testing](#testing)
9. [Troubleshooting](#troubleshooting)

---

## PREREQUISITES

### Required Software

1. **Node.js** (v18 or higher)
   ```bash
   # Check version
   node --version
   
   # Install from https://nodejs.org/
   ```

2. **Flutter SDK** (latest stable)
   ```bash
   # Check version
   flutter --version
   
   # Install from https://flutter.dev/docs/get-started/install
   ```

3. **Firebase CLI**
   ```bash
   npm install -g firebase-tools
   firebase --version
   ```

4. **Git**
   ```bash
   git --version
   ```

5. **Android Studio** (for Android development)
   - Download from https://developer.android.com/studio

6. **Xcode** (for iOS development, Mac only)
   - Download from Mac App Store

### Required Accounts

1. **Firebase Account** (free tier is sufficient)
   - Sign up at https://firebase.google.com/

2. **OpenAI Account** (for GPT-4 API)
   - Sign up at https://platform.openai.com/
   - Get API key from https://platform.openai.com/api-keys

3. **Google Developer Account** (for Android, $25 one-time)
   - https://play.google.com/console/

4. **Apple Developer Account** (for iOS, $99/year)
   - https://developer.apple.com/

---

## FIREBASE SETUP

### Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Enter project name: `chiron-omega`
4. Disable Google Analytics (optional)
5. Click "Create project"

### Step 2: Enable Required Services

#### Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Enable "Email/Password" provider
4. (Optional) Enable "Google" provider

#### Firestore Database
1. Go to "Firestore Database"
2. Click "Create database"
3. Start in "production mode"
4. Choose location closest to your users
5. Click "Enable"

#### Cloud Functions
1. Go to "Functions"
2. Click "Get started"
3. Upgrade to Blaze plan (pay-as-you-go)
   - Required for external API calls
   - Free tier: 2M invocations/month

#### Cloud Storage
1. Go to "Storage"
2. Click "Get started"
3. Use default security rules
4. Click "Done"

#### Cloud Messaging (FCM)
1. Go to "Cloud Messaging"
2. No setup required, automatically enabled

### Step 3: Get Firebase Configuration

#### For Android
1. In Firebase Console, click the Android icon
2. Enter package name: `com.chiron.omega`
3. Download `google-services.json`
4. Save for later

#### For iOS
1. Click the iOS icon
2. Enter bundle ID: `com.chiron.omega`
3. Download `GoogleService-Info.plist`
4. Save for later

#### For Web/Backend
1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click "Web" icon
4. Register app
5. Copy the `firebaseConfig` object
6. Save for later

---

## BACKEND DEPLOYMENT

### Step 1: Navigate to Backend Directory

```bash
cd CHIRON_PROJECT_OMEGA/backend/functions
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Environment Variables

```bash
# Set OpenAI API key
firebase functions:config:set openai.api_key="YOUR_OPENAI_API_KEY_HERE"

# Optional: Set custom OpenAI base URL
firebase functions:config:set openai.api_base="https://api.openai.com/v1"
```

### Step 4: Deploy Functions

```bash
# Login to Firebase
firebase login

# Initialize Firebase (if not already done)
firebase init

# Select:
# - Functions
# - Firestore
# - Storage
# - Hosting (optional)

# Deploy all functions
firebase deploy --only functions

# Or deploy specific function
firebase deploy --only functions:analyzeTarget
```

### Step 5: Set Firestore Security Rules

Create `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Targets
    match /targets/{targetId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // Interactions
    match /interactions/{interactionId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // Analyses
    match /analyses/{analysisId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // Raw data (Android background collection)
    match /rawData/{dataId} {
      allow write: if request.auth != null;
      allow read: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

Deploy rules:

```bash
firebase deploy --only firestore:rules
```

---

## FRONTEND SETUP

### Step 1: Navigate to Frontend Directory

```bash
cd CHIRON_PROJECT_OMEGA/frontend
```

### Step 2: Install Flutter Dependencies

```bash
flutter pub get
```

### Step 3: Add Firebase Configuration Files

#### For Android
1. Copy `google-services.json` to `android/app/`

```bash
cp /path/to/google-services.json android/app/
```

#### For iOS
1. Copy `GoogleService-Info.plist` to `ios/Runner/`

```bash
cp /path/to/GoogleService-Info.plist ios/Runner/
```

### Step 4: Configure Firebase in Code

Create `lib/firebase_options.dart`:

```dart
import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'YOUR_WEB_API_KEY',
    appId: 'YOUR_WEB_APP_ID',
    messagingSenderId: 'YOUR_SENDER_ID',
    projectId: 'chiron-omega',
    storageBucket: 'chiron-omega.appspot.com',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'YOUR_ANDROID_API_KEY',
    appId: 'YOUR_ANDROID_APP_ID',
    messagingSenderId: 'YOUR_SENDER_ID',
    projectId: 'chiron-omega',
    storageBucket: 'chiron-omega.appspot.com',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'YOUR_IOS_API_KEY',
    appId: 'YOUR_IOS_APP_ID',
    messagingSenderId: 'YOUR_SENDER_ID',
    projectId: 'chiron-omega',
    iosBundleId: 'com.chiron.omega',
    storageBucket: 'chiron-omega.appspot.com',
  );
}
```

---

## ANDROID DEPLOYMENT

### Step 1: Configure Android Permissions

Edit `android/app/src/main/AndroidManifest.xml`:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.chiron.omega">

    <!-- Required permissions -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.READ_CALL_LOG" />
    <uses-permission android:name="android.permission.READ_SMS" />
    <uses-permission android:name="android.permission.READ_CONTACTS" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.BIND_NOTIFICATION_LISTENER_SERVICE"
        tools:ignore="ProtectedPermissions" />

    <application
        android:label="Chiron Omega"
        android:name="${applicationName}"
        android:icon="@mipmap/ic_launcher">
        
        <!-- Main Activity -->
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:launchMode="singleTop"
            android:theme="@style/LaunchTheme"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|smallestScreenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
            android:hardwareAccelerated="true"
            android:windowSoftInputMode="adjustResize">
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

        <!-- Notification Listener Service -->
        <service
            android:name=".NotificationListener"
            android:label="Chiron Notification Listener"
            android:permission="android.permission.BIND_NOTIFICATION_LISTENER_SERVICE"
            android:exported="true">
            <intent-filter>
                <action android:name="android.service.notification.NotificationListenerService" />
            </intent-filter>
        </service>

    </application>
</manifest>
```

### Step 2: Build APK

```bash
# Debug build (for testing)
flutter build apk --debug

# Release build (for distribution)
flutter build apk --release

# Build for specific ABI (smaller file size)
flutter build apk --target-platform android-arm64 --release
```

Output location: `build/app/outputs/flutter-apk/app-release.apk`

### Step 3: Install on Device

```bash
# Via ADB
adb install build/app/outputs/flutter-apk/app-release.apk

# Or transfer APK to device and install manually
```

### Step 4: Grant Permissions

On first launch, the app will request permissions. Grant all requested permissions for full functionality.

For Notification Listener:
1. Go to Settings > Apps > Special app access
2. Select "Notification access"
3. Enable for Chiron Omega

---

## IOS DEPLOYMENT

### Step 1: Configure iOS Permissions

Edit `ios/Runner/Info.plist`:

```xml
<dict>
    <!-- Existing keys... -->
    
    <!-- Permission descriptions -->
    <key>NSContactsUsageDescription</key>
    <string>Chiron needs access to contacts for target profiling.</string>
    
    <key>NSCalendarsUsageDescription</key>
    <string>Chiron needs calendar access to schedule strategic actions.</string>
    
    <key>NSRemindersUsageDescription</key>
    <string>Chiron needs reminders access for tactical alerts.</string>
    
    <key>NSPhotoLibraryUsageDescription</key>
    <string>Chiron needs photo access to analyze target's visual content.</string>
    
    <key>NSCameraUsageDescription</key>
    <string>Chiron needs camera access for visual analysis.</string>
    
    <key>NSMicrophoneUsageDescription</key>
    <string>Chiron needs microphone access for voice analysis.</string>
    
    <!-- Background modes -->
    <key>UIBackgroundModes</key>
    <array>
        <string>fetch</string>
        <string>remote-notification</string>
        <string>processing</string>
    </array>
</dict>
```

### Step 2: Configure Signing

1. Open `ios/Runner.xcworkspace` in Xcode
2. Select "Runner" project
3. Go to "Signing & Capabilities"
4. Select your Team
5. Change Bundle Identifier to `com.chiron.omega` (or your unique ID)

### Step 3: Build IPA

```bash
# Build for iOS
flutter build ios --release

# Or build via Xcode
# Open ios/Runner.xcworkspace
# Product > Archive
# Distribute App
```

### Step 4: TestFlight Distribution (Optional)

1. In Xcode, after archiving, click "Distribute App"
2. Select "App Store Connect"
3. Upload to TestFlight
4. Add internal testers
5. Install via TestFlight app

---

## CONFIGURATION

### Environment Variables

Create `.env` file in `backend/functions/`:

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-...your-key-here...
OPENAI_API_BASE=https://api.openai.com/v1

# Firebase Configuration
FIREBASE_PROJECT_ID=chiron-omega
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY=...

# Optional: Local LLM
LOCAL_LLM_ENDPOINT=http://localhost:11434/api/generate
LOCAL_LLM_MODEL=llama2
```

### App Configuration

Edit `lib/config/app_config.dart`:

```dart
class AppConfig {
  // API Configuration
  static const String firebaseProjectId = 'chiron-omega';
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
  
  // Security
  static const bool enableLocalEncryption = true;
  static const bool requireBiometricAuth = false;
}
```

---

## TESTING

### Unit Tests

```bash
cd frontend
flutter test
```

### Integration Tests

```bash
flutter test integration_test/
```

### Backend Tests

```bash
cd backend/functions
npm test
```

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Target profile creation
- [ ] Manual interaction logging
- [ ] Analysis request and response
- [ ] Notification delivery
- [ ] Background service (Android)
- [ ] Notification listener (Android)
- [ ] Data synchronization
- [ ] Offline mode
- [ ] App restart persistence

---

## TROUBLESHOOTING

### Common Issues

#### 1. Firebase Connection Error

**Symptom**: "FirebaseException: No Firebase App '[DEFAULT]' has been created"

**Solution**:
```dart
// Ensure Firebase is initialized before runApp()
await Firebase.initializeApp(
  options: DefaultFirebaseOptions.currentPlatform,
);
```

#### 2. Android Permissions Not Working

**Symptom**: Permissions denied even after granting

**Solution**:
- Check `AndroidManifest.xml` has all required permissions
- For dangerous permissions, request at runtime
- For special permissions (notification listener), guide user to settings

#### 3. iOS Build Fails

**Symptom**: "Code signing error" or "Provisioning profile error"

**Solution**:
- Ensure Bundle ID is unique
- Select correct Team in Xcode
- Create provisioning profile in Apple Developer Portal
- Clean build: `flutter clean && flutter pub get`

#### 4. Cloud Functions Not Deploying

**Symptom**: "Billing account not configured"

**Solution**:
- Upgrade Firebase project to Blaze plan
- Add payment method in Firebase Console
- Free tier is generous (2M function calls/month)

#### 5. OpenAI API Errors

**Symptom**: "Invalid API key" or "Rate limit exceeded"

**Solution**:
- Verify API key is correct
- Check API key has GPT-4 access
- Add payment method to OpenAI account
- Implement rate limiting in code

---

## NEXT STEPS

After successful installation:

1. **Upload Codex**: Import `CODEX_OMEGA.md` into Firebase Storage
2. **Create Target Profile**: Add your first target in the app
3. **Test Analysis**: Log an interaction and request analysis
4. **Configure Notifications**: Ensure push notifications work
5. **Enable Background Services** (Android): Start monitoring
6. **Review Security**: Ensure all data is encrypted
7. **Backup Data**: Set up automatic Firestore backups

---

## SUPPORT

For issues not covered here:

1. Check the [API Reference](API_REFERENCE.md)
2. Review [Usage Guide](USAGE_GUIDE.md)
3. Consult the [Codex](../codex/CODEX_OMEGA.md)

---

**Installation complete! You're ready to use Chiron Omega.**

*Last Updated: November 2, 2025*

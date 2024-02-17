npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

cd android 
./gradlew assembleDebug 

# output at android/app/build/outputs/apk/debug/app-debug.apk
cd ..
cp android/app/build/outputs/apk/debug/app-debug.apk ~/Downloads/aes-commando-$(date +%s).apk

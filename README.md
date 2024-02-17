# AES Commando
Private offline android app to encrypt/decrypt using AES

useful for storing sensitive information in cloud (e.g google sheet, docs) and then decrypt when needed

## build android apk
```bash
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

cd android 
./gradlew assembleDebug 

# output at android/app/build/outputs/apk/debug/app-debug.apk
cd ..
cp android/app/build/outputs/apk/debug/app-debug.apk ~/Downloads/aes-commando-$(date +%s).apk

```

## TODO
- [ ] Handle exceptions and show proper error msg
- [ ] Handle dark theme
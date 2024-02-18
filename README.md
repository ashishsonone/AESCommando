# AES Commando
Private offline android app to encrypt/decrypt using AES

useful for storing sensitive information in cloud (e.g google sheet, docs) and then decrypt when needed

## build android apk
Use `scripts/gen-release-apk.sh`

Warning : it uses debug signing key as of now to sign

## permissions - No INTERNET
```bash
adb shell dumpsys package com.aescommando | grep permission

    declared permissions:
    requested permissions:
      android.permission.SYSTEM_ALERT_WINDOW
      android.permission.ACCESS_WIFI_STATE
    install permissions:
      android.permission.ACCESS_WIFI_STATE: granted=true
      runtime permissions:

# we can see - no INTERNET permission
# no analytics, no sneaky upload of data even if the app wanted to
# just pure encryption/decryption
```

## TODO
- [ ] Handle exceptions and show proper error msg
- [x] Handle dark theme
- [x] Remove INTERNET permission from manifest file

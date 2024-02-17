package com.aescommando

import javax.crypto.Cipher
import javax.crypto.spec.IvParameterSpec
import javax.crypto.spec.SecretKeySpec
import java.security.SecureRandom
import java.util.Base64
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.Promise

/*
https://play.kotlinlang.org

Ciphertext: f58178e054d82014a0dc0949f68cd8b97725bfe8d95d5b08853e2941ce97ea0e
Decoded text: This is lit
*/

val BASE64 = false

class EncModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  // add to CalendarModule.kt
  override fun getName() = "EncModule"

  @ReactMethod
  fun greet(name: String, promise: Promise) {
    val greeting = "Hello, $name"
    promise.resolve(greeting) 
  }

  @ReactMethod
  fun encode(plaintext: String, password: String, promise: Promise) {
    try {
      val out = encode(plaintext, password)
      promise.resolve(out)
    }
    catch(e: Exception) {
      promise.reject(e.message)
    }
  }

  @ReactMethod
  fun decode(ciphertext: String, password: String, promise: Promise) {
    try {
      val out = decode(ciphertext, password)
      promise.resolve(out)
    }
    catch(e: Exception) {
      promise.reject(e.message)
    }
  }
  
}

fun encode(plaintext: String, password: String): String {
  val keyData = password.toByteArray()
  val keyT = keyData.copyOf(16)
  
  val key = SecretKeySpec(keyT, "AES")
  // println("key: ${key.encoded.toHex()}")

  val cipher = Cipher.getInstance("AES/CBC/PKCS5Padding")
  val iv = ByteArray(cipher.blockSize)
  SecureRandom().nextBytes(iv)
  val ivParameterSpec = IvParameterSpec(iv)
  
  
  cipher.init(Cipher.ENCRYPT_MODE, key, ivParameterSpec)
  
  // println("iv: ${iv.toHex()}")
  

  val encrypted = cipher.doFinal(plaintext.toByteArray())
  val combined = ByteArray(iv.size + encrypted.size)
  System.arraycopy(iv, 0, combined, 0, iv.size)
  System.arraycopy(encrypted, 0, combined, iv.size, encrypted.size)

  return if (BASE64) Base64.getEncoder().encodeToString(combined) else combined.toHex()
}

fun decode(ciphertext: String, password: String): String {
  val keyData = password.toByteArray()
  val keyT = keyData.copyOf(16)
  
  val key = SecretKeySpec(keyT, "AES")
  // println("key: ${key.encoded.toHex()}")

  // val key = SecretKeySpec(key, "AES")
  val cipher = Cipher.getInstance("AES/CBC/PKCS5Padding")

  
  val combined = if (BASE64) Base64.getDecoder().decode(ciphertext) else ciphertext.hexStringToByteArray()
  // println("combined: ${combined.size}")
  
  val iv = ByteArray(cipher.blockSize)
  val encrypted = ByteArray(combined.size - iv.size)
  System.arraycopy(combined, 0, iv, 0, iv.size)
  System.arraycopy(combined, iv.size, encrypted, 0, encrypted.size)
  // println("encrypted: ${encrypted.size}")

  // println("iv: ${iv.toHex()}")
  
  val ivParameterSpec = IvParameterSpec(iv)
  cipher.init(Cipher.DECRYPT_MODE, key, ivParameterSpec)

  return String(cipher.doFinal(encrypted))
}

fun ByteArray.toHex(): String {
  return joinToString("") { "%02x".format(it) }
}

fun String.hexStringToByteArray(): ByteArray {
  val result = ByteArray(length / 2)
  for (i in 0 until length step 2) {
      result[i / 2] = ((Character.digit(this[i], 16) shl 4) + Character.digit(this[i + 1], 16)).toByte()
  }
  return result
}

// fun main() {
//   val plaintext = "This is lit"
//   val password = "Kuchbhikaho"

//   val ciphertext = encode(plaintext, password)
//   println("Ciphertext: $ciphertext")

//   val decodedText = decode(ciphertext, password)
//   println("Decoded text: $decodedText")
// }
package com.nertivia.modules.fcm;

import android.app.Activity;
import android.app.Application;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.common.activitylistener.ActivityListener;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.messaging.FirebaseMessaging;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

public class FCMModule extends ReactContextBaseJavaModule implements ActivityEventListener {
    private ReactApplicationContext reactContext;
    public FCMModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
        reactContext.addActivityEventListener(this);
    }



    @NonNull
    @Override
    public String getName() {
        return "FCMModule";
    }

    @ReactMethod
    public void getToken(Promise promise) {
        int isGPAvailable = GoogleApiAvailability.getInstance().isGooglePlayServicesAvailable(reactContext);
        if (isGPAvailable != ConnectionResult.SUCCESS) {
            promise.reject("Error", "Google Play Services Not Available");
            return;
        }
        FirebaseMessaging.getInstance().getToken()
                .addOnCompleteListener(task -> {
                    if (!task.isSuccessful()) {
                        promise.reject("Error", task.getException().getMessage());
                        return;
                    }
                    String token = task.getResult();
                    promise.resolve(token);
                });
    }
    @ReactMethod
    public void notificationClicked(Promise promise) {
        final Intent intent = reactContext.getCurrentActivity().getIntent();
        Bundle bundle = intent.getExtras();
        if (bundle != null) {
            WritableMap params = bundleToMap(bundle);
            promise.resolve(params);
        }
        promise.resolve(null);
    }




    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    public static WritableMap bundleToMap(Bundle extras) {
        WritableMap map = Arguments.createMap();
        Set<String> ks = extras.keySet();
        for (String key : ks) {
            map.putString(key, extras.getString(key));
        }
        return map;
    }


    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {

    }

    @Override
    public void onNewIntent(Intent intent) {
        Bundle bundle = intent.getExtras();
        if (bundle != null) {
            WritableMap params = bundleToMap(bundle);
            sendEvent(reactContext, "onNotificationClick", params);
        }
    }


}

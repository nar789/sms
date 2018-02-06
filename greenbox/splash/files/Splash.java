package ^^package;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Typeface;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.TextView;

/**
 * Created by leejunghun on 2017-10-02.
 */

public class Splash extends Activity {
    final Activity s=this;
    @Override
    public void onCreate(Bundle b){
        super.onCreate(b);
        setContentView(R.layout.splash);
        h.sendEmptyMessageDelayed(0,2000);
    }

    Handler h=new Handler(){
        public void handleMessage(Message msg){
            Intent intent=new Intent(s,MainActivity.class);
            startActivity(intent);
            finish();
        }
    };
}
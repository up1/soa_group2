package com.grouptwo.zalada.counterservicemockup;

import android.*;
import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.media.AudioManager;
import android.media.ToneGenerator;
import android.os.AsyncTask;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.google.android.gms.vision.barcode.Barcode;
import com.google.android.gms.vision.barcode.BarcodeDetector;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class MainActivity extends AppCompatActivity {

    private static final int MY_PERMISSIONS_REQUEST_CAMERA = 1;
    private static final int REQUEST_FOR_BARCODE_READER = 2;
    private EditText editText;
    private Repository repository;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        editText = (EditText) findViewById(R.id.editText);
        setRepository(new Repository());
        checkPermission();
    }

    private void checkPermission(){
        if (ContextCompat.checkSelfPermission(this,
                Manifest.permission.CAMERA)
                != PackageManager.PERMISSION_GRANTED) {

            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.CAMERA}, MY_PERMISSIONS_REQUEST_CAMERA);
        }
    }


    public void onClickScanner(View view) {
        Intent intent = new Intent(this, BarcodeScannerActivity.class);
        startActivityForResult(intent, REQUEST_FOR_BARCODE_READER);
    }

    public void onClickBareHand(View view) {
        PaySlipRequest paySlipRequest = new PaySlipRequest();
        paySlipRequest.setPoNumber(editText.getText().toString());
        paySlipRequest.execute();

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_FOR_BARCODE_READER) {

            if (resultCode == RESULT_OK) {
                editText.setText(data.getStringExtra("poNumber"));
            }
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           String permissions[], int[] grantResults) {
        switch (requestCode) {
            case MY_PERMISSIONS_REQUEST_CAMERA: {
                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {

                    Toast.makeText(this, "Thank you", Toast.LENGTH_SHORT).show();
                } else {
                    checkPermission();
                    Toast.makeText(this, "This App Requst Camera Permission", Toast.LENGTH_SHORT).show();
                }
                return;
            }
        }
    }

    public void setRepository(Repository repository) {
        this.repository = repository;
    }

    public Repository getRepository() {
        return repository;
    }

    private class PaySlipRequest extends AsyncTask<Void, Void, Void> {

        private String poNumber;

        void setPoNumber(String poNumber) {
            this.poNumber = poNumber;
        }

        String getPoNumber() {
            return poNumber;
        }

        @Override
        protected Void doInBackground(Void... params) {
            try {
                Repository repository = getRepository();
                ResponseEntity<Void> responseEntity = repository.paySlip(getPoNumber());

                if (responseEntity.getStatusCode().equals(HttpStatus.OK)) {
                    ToneGenerator toneG = new ToneGenerator(AudioManager.STREAM_ALARM, 100);
                    toneG.startTone(ToneGenerator.TONE_CDMA_ALERT_CALL_GUARD, 200);
                }
            } catch (Exception e) {
                Log.e("BarcodeScannerActivity", e.getMessage(), e);
            }
            return null;
        }



    }
}

package com.ifinancas.services.impl

import android.app.Activity
import android.content.Context
import android.content.ContextWrapper
import android.util.Log
import com.google.android.gms.ads.AdError
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.FullScreenContentCallback
import com.google.android.gms.ads.LoadAdError
import com.google.android.gms.ads.interstitial.InterstitialAd
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback
import com.ifinancas.data.gitignore.intersitititialAdId
import com.ifinancas.services.InterstitialAdsService
import com.ifinancas.utils.AppUtils.Companion.AppTag
import dagger.hilt.android.qualifiers.ApplicationContext
import javax.inject.Inject

class IntersititialAdsServiceImpl @Inject constructor(
    @ApplicationContext private val context: Context
) : InterstitialAdsService {
    var mInterstitialAd: InterstitialAd? = null
    override fun loadAd() {
        InterstitialAd.load(
            context,
            intersitititialAdId,
            AdRequest.Builder().build(),
            object : InterstitialAdLoadCallback() {
                override fun onAdFailedToLoad(adError: LoadAdError) {
                    Log.d(AppTag, "erro ao carregar ads: $adError")
                    mInterstitialAd = null
                }

                override fun onAdLoaded(interstitialAd: InterstitialAd) {
                    Log.d(AppTag, "sucesso ao carregar ads")
                    mInterstitialAd = interstitialAd
                }
            }
        )
    }

    override fun show() {
        val activity = context.findActivity()

        if (mInterstitialAd != null && activity != null) {
            mInterstitialAd?.fullScreenContentCallback = object : FullScreenContentCallback() {
                override fun onAdFailedToShowFullScreenContent(e: AdError) {
                    Log.d(AppTag, "erro ao exibir ads: $e")
                    mInterstitialAd = null
                }

                override fun onAdDismissedFullScreenContent() {
                    mInterstitialAd = null

                    loadAd()
                }
            }
            mInterstitialAd?.show(activity)
        }
    }

    override fun removeListener() {
        mInterstitialAd?.fullScreenContentCallback = null
        mInterstitialAd = null
    }

    private fun Context.findActivity(): Activity? = when (this) {
        is Activity -> this
        is ContextWrapper -> baseContext.findActivity()
        else -> null
    }
}
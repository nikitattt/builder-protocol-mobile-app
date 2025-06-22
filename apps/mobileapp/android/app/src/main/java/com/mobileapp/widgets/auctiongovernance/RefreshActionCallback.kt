package com.mobileapp.widgets.auctiongovernance

import android.content.Context
import androidx.glance.GlanceId
import androidx.glance.appwidget.action.ActionCallback

class RefreshActionCallback : ActionCallback {
    override suspend fun onAction(
        context: Context,
        glanceId: GlanceId,
        parameters: androidx.glance.action.ActionParameters
    ) {
        AuctionGovernanceWidget().update(context, glanceId)
    }
} 
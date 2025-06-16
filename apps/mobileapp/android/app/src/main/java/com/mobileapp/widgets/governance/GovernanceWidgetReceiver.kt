package com.mobileapp.widgets.governance

import android.appwidget.AppWidgetManager
import android.content.Context
import androidx.glance.appwidget.GlanceAppWidget
import androidx.glance.appwidget.GlanceAppWidgetManager
import androidx.glance.appwidget.GlanceAppWidgetReceiver
import com.mobileapp.widgets.common.ApplicationScope
import com.mobileapp.widgets.storage.WidgetPreferences
import kotlinx.coroutines.launch
import android.util.Log

class GovernanceWidgetReceiver : GlanceAppWidgetReceiver() {
    override val glanceAppWidget: GlanceAppWidget = GovernanceWidget

    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        super.onUpdate(context, appWidgetManager, appWidgetIds)
        Log.d("WidgetDebug", "Receiver: onUpdate triggered for widget IDs: ${appWidgetIds.joinToString()}")

//        ApplicationScope.scope.launch {
//            Log.d("WidgetDebug", "Receiver: Coroutine started.")
//            val manager = GlanceAppWidgetManager(context)
//            appWidgetIds.forEach { appWidgetId ->
//                manager.getGlanceIdBy(appWidgetId)?.let { glanceId ->
//                    Log.d("WidgetDebug", "Receiver: Updating glanceId ($glanceId).")
//                    glanceAppWidget.update(context, glanceId)
//                }
//            }
//            Log.d("WidgetDebug", "Receiver: Coroutine finished.")
//        }
    }

    override fun onDeleted(context: Context, appWidgetIds: IntArray) {
        super.onDeleted(context, appWidgetIds)
        val prefs = WidgetPreferences(context)
        ApplicationScope.scope.launch {
            for (id in appWidgetIds) {
                prefs.deleteConfiguration(id)
            }
        }
    }
} 
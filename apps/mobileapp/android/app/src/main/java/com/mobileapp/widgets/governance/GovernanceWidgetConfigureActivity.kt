package com.mobileapp.widgets.governance

import android.app.Activity
import android.appwidget.AppWidgetManager
import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.glance.GlanceModifier
import androidx.glance.appwidget.AppWidgetId
import androidx.glance.appwidget.GlanceAppWidgetManager
import androidx.glance.appwidget.cornerRadius
import androidx.glance.appwidget.updateAll
import androidx.glance.background
import androidx.glance.layout.padding
import androidx.glance.unit.ColorProvider
import androidx.lifecycle.lifecycleScope
import com.mobileapp.widgets.storage.WidgetPreferences
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.launch
import androidx.compose.foundation.border
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.draw.clip

class GovernanceWidgetConfigureActivity : ComponentActivity() {

    private var appWidgetId = AppWidgetManager.INVALID_APPWIDGET_ID
    private val coroutineScope = MainScope()

    // Placeholder data - replace with your actual DAO list
    private val sampleDaos = listOf(
        DAOData("Builder", "0xdf9b7d26c8fc806b1ae6273684556761ff02d422", 1),
        DAOData("Nouns", "0x9c8ff314c9bc7f6e59a9d9ac51c4d44102734004", 1),
        DAOData("Lil Nouns", "0x4b10701bfd7bfedc47d50562b76b436fbb5b24e4", 1)
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        intent.extras?.let {
            appWidgetId = it.getInt(
                AppWidgetManager.EXTRA_APPWIDGET_ID,
                AppWidgetManager.INVALID_APPWIDGET_ID
            )
        }

        if (appWidgetId == AppWidgetManager.INVALID_APPWIDGET_ID) {
            finish()
            return
        }

        setContent {
            ConfigureUi(daos = sampleDaos, onDaoSelected = { dao ->
                lifecycleScope.launch {
                    onDaoSelected(dao)
                }
            })
        }
    }

    private suspend fun onDaoSelected(dao: DAOData) {
        val context = this
        val prefs = WidgetPreferences(context)

        Log.d("WidgetDebug", "Config: Saving preferences...")
        prefs.saveConfiguration(appWidgetId, dao.address, dao.name, dao.chainId)
        Log.d("WidgetDebug", "Config: Preferences saved.")

//        val glanceId = GlanceAppWidgetManager(context).getGlanceIdBy(appWidgetId)
//        if (glanceId != null) {
//            Log.d("WidgetDebug", "Config: Got glanceId ($glanceId). Calling update.")
//            GovernanceWidget.update(context, glanceId)
//        } else {
//            Log.d("WidgetDebug", "Config: glanceId is NULL. Cannot call update.")
//        }
//        Log.d("WidgetDebug", "Config: Sending broadcast to update widget ID $appWidgetId")
//        val intent = Intent(context, GovernanceWidgetReceiver::class.java).apply {
//            action = AppWidgetManager.ACTION_APPWIDGET_UPDATE
//            putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, intArrayOf(appWidgetId))
//        }
//        context.sendBroadcast(intent)

        val manager = GlanceAppWidgetManager(context)
        val widget = GovernanceWidget
        val glanceIds = manager.getGlanceIds(widget.javaClass)
        glanceIds.forEach { glanceId ->
            widget.update(context, glanceId)
        }

        val resultValue = Intent().apply {
            putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId)
        }
        setResult(Activity.RESULT_OK, resultValue)
        finish()
    }
}

@Composable
fun ConfigureUi(daos: List<DAOData>, onDaoSelected: (DAOData) -> Unit) {
    MaterialTheme {
        Surface(modifier = Modifier.fillMaxSize()) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Select DAO", style = MaterialTheme.typography.headlineLarge)
                Spacer(modifier = Modifier.height(16.dp))
                LazyColumn {
                    items(daos) { dao ->
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clip(RoundedCornerShape(12.dp))
                                .background(color = MaterialTheme.colorScheme.surfaceVariant)
                                .clickable { onDaoSelected(dao) }
                        ) {
                            Text(
                                dao.name,
                                style = MaterialTheme.typography.bodyLarge,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                                modifier = Modifier.padding(vertical = 20.dp, horizontal = 12.dp)
                            )
                        }
                        Spacer(modifier = Modifier.height(12.dp))
                    }
                }
            }
        }
    }
}

data class DAOData(val name: String, val address: String, val chainId: Int) 
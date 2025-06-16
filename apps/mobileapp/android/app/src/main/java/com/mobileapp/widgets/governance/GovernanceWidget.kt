package com.mobileapp.widgets.governance

import android.content.Context
import android.util.Log
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.glance.GlanceId
import androidx.glance.GlanceModifier
import androidx.glance.LocalContext
import androidx.glance.appwidget.GlanceAppWidget
import androidx.glance.appwidget.lazy.LazyColumn
import androidx.glance.appwidget.lazy.items
import androidx.glance.appwidget.provideContent
import androidx.glance.background
import androidx.glance.color.ColorProvider
import androidx.glance.layout.Alignment
import androidx.glance.layout.Box
import androidx.glance.layout.Column
import androidx.glance.layout.Row
import androidx.glance.layout.Spacer
import androidx.glance.layout.fillMaxSize
import androidx.glance.layout.height
import androidx.glance.layout.padding
import androidx.glance.text.FontWeight
import androidx.glance.text.Text
import androidx.glance.text.TextStyle
import com.mobileapp.widgets.common.WidgetDataLoader
import com.mobileapp.widgets.common.ui.ProposalView
import com.mobileapp.widgets.models.ProposalData
import com.mobileapp.widgets.storage.WidgetPreferences
import kotlinx.coroutines.flow.firstOrNull

object GovernanceWidget : GlanceAppWidget() {

    override suspend fun provideGlance(context: Context, id: GlanceId) {
        val prefs = WidgetPreferences(context)
        
//        val daoAddress = prefs.getDaoAddress(appWidgetId = id.toInt()).firstOrNull()
//        val daoName = prefs.getDaoName(appWidgetId = id.toInt()).firstOrNull()
//        val chainId = prefs.getChainId(appWidgetId = id.toInt()).firstOrNull()

//        val daoAddress = "0xe8af882f2f5c79580230710ac0e2344070099432"
//        val daoName = "Builder"
//        val chainId = 8453

        val daoAddress = "0x8de71d80ee2c4700bc9d4f8031a2504ca93f7088"
        val daoName = "Purple"
        val chainId = 8453

        Log.d("GovernanceWidget", "prefs: $prefs")
        Log.d("GovernanceWidget", "widgetId: ${id.toInt()} , daoAddress: $daoAddress, daoName: $daoName, chainId: $chainId")

        val proposals = if (daoAddress != null && chainId != null) {
            fetchData(context, daoAddress, chainId)
        } else {
            null
        }

        provideContent {
            val isLightTheme = isLightTheme() // You'll need to implement this based on your app's theme logic
            WidgetShell(isLightTheme = isLightTheme) {
                when {
                    daoAddress == null || daoName == null || chainId == null -> {
                        NotConfiguredState()
                    }
                    else -> {
                        if (proposals == null) {
                            ErrorState()
                        } else {
                            Content(
                                daoName = daoName,
                                proposals = proposals,
                                isLightTheme = isLightTheme
                            )
                        }
                    }
                }
            }
        }
    }

    private suspend fun fetchData(context: Context, address: String, chainId: Int): List<ProposalData>? {
        val dataLoader = WidgetDataLoader(context)
        return dataLoader.fetchGovernanceData(address, chainId)
    }

    @Composable
    private fun Content(daoName: String, proposals: List<ProposalData>, isLightTheme: Boolean) {
        val activeProps = proposals.count { it.state == "ACTIVE" }
        val pendingProps = proposals.count { it.state == "PENDING" }

        Column(modifier = GlanceModifier.fillMaxSize()) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(
                    text = daoName,
                    style = TextStyle(fontSize = 12.sp, fontWeight = FontWeight.Bold)
                )
                Spacer(modifier = GlanceModifier.defaultWeight())
                if (activeProps > 0) {
                    Text("Active", style = TextStyle(fontSize = 12.sp, color = ColorProvider(Color.DarkGray, Color.DarkGray)))
                    Text(activeProps.toString(), style = TextStyle(fontSize = 12.sp))
                }
                if (pendingProps > 0) {
                    Text("Pending", style = TextStyle(fontSize = 12.sp, color = ColorProvider(Color.DarkGray, Color.DarkGray)))
                    Text(pendingProps.toString(), style = TextStyle(fontSize = 12.sp))
                }
            }
            Spacer(modifier = GlanceModifier.height(4.dp))
            // Divider not directly available, use a Box with a background color
            Box(
                modifier = GlanceModifier
                    .height(1.dp)
                    .background(ColorProvider(Color(0xFFE5E5E5), Color(0xFF333333)))
            ) {}
            Spacer(modifier = GlanceModifier.height(4.dp))
            if (proposals.isEmpty()) {
                Text(
                    "All done. No Active or Pending props ⌐◨-◨",
                    style = TextStyle(fontSize = 12.sp)
                )
            } else {
                LazyColumn {
                    items(proposals) { proposal ->
                        ProposalView(proposal = proposal, isLightTheme = isLightTheme)
                    }
                }
            }
        }
    }

    @Composable
    private fun NotConfiguredState() {
        Box(
            modifier = GlanceModifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Text("Tap and hold to set up widget", style = TextStyle(fontWeight = FontWeight.Bold))
        }
    }

    @Composable
    private fun ErrorState() {
        Box(
            modifier = GlanceModifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Text("Error happened", style = TextStyle(fontWeight = FontWeight.Bold))
        }
    }

    @Composable
    private fun WidgetShell(isLightTheme: Boolean, content: @Composable () -> Unit) {
        Box(
            modifier = GlanceModifier
                .fillMaxSize()
                .background(ColorProvider(Color.White, Color.Black))
                .padding(16.dp)
        ) {
            content()
        }
    }
    
    // A placeholder for your theme detection logic
    @Composable
    private fun isLightTheme(): Boolean {
        // In a real app, you would check the system's theme.
        // For Glance, this can be complex. Starting with a default.
        return true
    }
}
private fun GlanceId.toInt(): Int {
    val idString = this.toString()
        .substringAfter("appWidgetId=")
        .substringBefore(")")
    return idString.toInt()
}

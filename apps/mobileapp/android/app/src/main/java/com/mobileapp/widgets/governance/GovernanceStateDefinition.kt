package com.mobileapp.widgets.governance

import android.content.Context
import androidx.datastore.core.CorruptionException
import androidx.datastore.core.DataStore
import androidx.datastore.core.DataStoreFactory
import androidx.datastore.core.Serializer
import androidx.datastore.dataStoreFile
import androidx.glance.state.GlanceStateDefinition
import kotlinx.serialization.SerializationException
import kotlinx.serialization.json.Json
import java.io.File
import java.io.InputStream
import java.io.OutputStream

object GovernanceStateDefinition : GlanceStateDefinition<GovernanceInfo> {

    private const val DATA_STORE_FILE_NAME = "daoWidgetConfig"

    override suspend fun getDataStore(context: Context, fileKey: String): DataStore<GovernanceInfo>
    = DataStoreFactory.create(
        serializer = GovernanceInfoSerializer,
        produceFile = { context.dataStoreFile("${DATA_STORE_FILE_NAME}_$fileKey.json") }
    )

    override fun getLocation(context: Context, fileKey: String): File {
        return context.dataStoreFile("${DATA_STORE_FILE_NAME}_$fileKey.json")
    }

    object GovernanceInfoSerializer : Serializer<GovernanceInfo> {
        override val defaultValue = GovernanceInfo()

        override suspend fun readFrom(input: InputStream): GovernanceInfo {
            try {
                return Json.decodeFromString(
                    GovernanceInfo.serializer(),
                    input.readBytes().decodeToString()
                )
            } catch (exception: SerializationException) {
                throw CorruptionException("Could not read state: ${exception.message}")
            }
        }

        override suspend fun writeTo(t: GovernanceInfo, output: OutputStream) {
            output.use {
                it.write(
                    Json.encodeToString(GovernanceInfo.serializer(), t).encodeToByteArray()
                )
            }
        }
    }
} 
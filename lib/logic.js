/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.bl.network.MessageTransaction} messageTransaction
 * @transaction
 */
async function publishMessages(tx) {
    // Save old messages
    let oldMessages = tx.topic.messages
    // Update the asset with the new value.
    tx.topic.messages = tx.newMessages;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.bl.network.Topic');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.topic);

    
    let event = getFactory().newEvent('org.bl.network', 'TopicEvent');
    event.asset = tx.topic;
    event.oldMessages = oldMessages;
    event.newMessages = tx.newMessages;
    emit(event);
    
}

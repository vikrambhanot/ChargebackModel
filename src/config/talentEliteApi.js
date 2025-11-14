// src/services/talentEliteApi.js

import { API_ENDPOINTS } from "../config/api";

export const talentEliteApi = {

  /**
   * Accept an agent conversation offer
   * Updates the application to mark agent as accepted
   */
  async acceptAgent(applicationId, userId, agentType) {
    try {
      //console.log('🤖 Accepting agent offer:', { applicationId, userId, agentType });
      
      const response = await fetch(
        `${API_ENDPOINTS}/ats/applications/${applicationId}/agent/accept?userId=${userId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ agent_type: agentType })
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error('❌ Accept agent error:', error);
        throw new Error(error.error || 'Failed to accept agent offer');
      }

      const data = await response.json();
      //console.log('✅ Agent offer accepted');
      return data;
      
    } catch (error) {
      console.error('❌ Error accepting agent:', error);
      throw error;
    }
  },

  /**
   * Decline an agent conversation offer
   * Updates the application to mark agent as declined
   */
  async declineAgent(applicationId, userId) {
    try {
      //console.log('❌ Declining agent offer:', { applicationId, userId });
      
      const response = await fetch(
        `${API_ENDPOINTS}/ats/applications/${applicationId}/agent/decline?userId=${userId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error('❌ Decline agent error:', error);
        throw new Error(error.error || 'Failed to decline agent offer');
      }

      const data = await response.json();
      //console.log('✅ Agent offer declined');
      return data;
      
    } catch (error) {
      console.error('❌ Error declining agent:', error);
      throw error;
    }
  },

  /**
   * Start a new agent conversation
   * Creates conversation context and returns first agent message
   * Backend manages history via AgentContextStore
   */
  async startAgentConversation(data) {
    try {
      
      const response = await fetch(`${API_ENDPOINTS}/agent/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('❌ Start conversation error:', error);
        throw new Error(error.error || 'Failed to start conversation');
      }

      const result = await response.json();
      //console.log('✅ Conversation started:', result.conversation_id);
      return result;
      
    } catch (error) {
      console.error('❌ Error starting conversation:', error);
      throw error;
    }
  },

  /**
   * Send a message in an ongoing conversation
   * Backend manages conversation history via AgentContextStore
   * Frontend only sends user_message (no history needed!)
   */
  async sendAgentMessage(conversationId, userId, userMessage) {
    try {
      
      
      const response = await fetch(`${API_ENDPOINTS}/agent/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversation_id: conversationId,
          user_id: userId,
          message: userMessage
          // ✅ NO conversation_history needed!
          // Backend fetches it from AgentContextStore
        })
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('❌ Send message error:', error);
        throw new Error(error.error || 'Failed to send message');
      }

      const result = await response.json();
      
      return result;
      
    } catch (error) {
      console.error('❌ Error sending message:', error);
      throw error;
    }
  },

  /**
   * Get conversation details and history
   * Used for loading/resuming conversations
   */
  async getAgentConversation(conversationId, userId) {
    try {
      //console.log('📖 Fetching conversation:', conversationId);
      
      const response = await fetch(
        `${API_ENDPOINTS}/agent/conversation/${conversationId}?userId=${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error('❌ Get conversation error:', error);
        throw new Error(error.error || 'Failed to get conversation');
      }

      const data = await response.json();
      
      return data;
      
    } catch (error) {
      console.error('❌ Error fetching conversation:', error);
      throw error;
    }
  },

  /**
 * Quit/terminate an agent conversation for an application
 * Server should mark agent_status='failed' (or 'declined'), clear stage, and timestamp.
 */
async quitAgent(applicationId, userId, conversationId) {
  try {
    const response = await fetch(
      `${API_ENDPOINTS}/ats/applications/${applicationId}/agent/quit?userId=${userId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ conversation_id: conversationId })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Quit agent error:', error);
      throw new Error(error.error || 'Failed to quit agent conversation');
    }

    return await response.json();
  } catch (error) {
    console.error('❌ Error quitting agent:', error);
    throw error;
  }
},

// Add these methods to your talentEliteApi.js file

/**
 * Messaging API Methods
 */

// Get messages for an application (candidate view)
async getApplicationMessages(applicationId, userId) {
  try {
    const response = await fetch(
      `${API_ENDPOINTS}/ats/applications/${applicationId}/messages?userId=${userId}&userType=candidate`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching messages:', error);
    return { messages: [], channel: { is_open: false }, unread_count: 0 };
  }
},

// Send a message (candidate)
async sendMessage(applicationId, userId, messageText) {
  try {
    console.log('📤 Sending message to backend:', {
      applicationId,
      userId,
      messageText: messageText.substring(0, 50) + '...'
    });
    
    const response = await fetch(
      `${API_ENDPOINTS}/ats/applications/${applicationId}/messages?userId=${userId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender_type: 'candidate',
          message_text: messageText
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Backend error:', errorData);
      throw new Error(errorData.error || 'Failed to send message');
    }

    const result = await response.json();
    console.log('✅ Backend response:', result);
    
    return result;
  } catch (error) {
    console.error('❌ Error in sendMessage:', error);
    throw error;
  }
},

// Mark messages as read (candidate)
async markMessagesAsRead(applicationId, userId) {
  try {
    const response = await fetch(
      `${API_ENDPOINTS}/ats/applications/${applicationId}/messages/read?userId=${userId}&userType=candidate`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to mark messages as read');
    }

    return await response.json();
  } catch (error) {
    console.error('Error marking messages as read:', error);
    return { success: false };
  }
}

};
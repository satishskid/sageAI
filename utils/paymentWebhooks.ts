// Payment Gateway Webhook Handlers
// This file shows how to integrate with Stripe and Razorpay webhooks

import ProFeaturesService from '../services/proFeaturesService';

// Types for webhook events
interface StripeWebhookEvent {
  type: string;
  data: {
    object: {
      id: string;
      customer: string;
      subscription?: string;
      metadata?: {
        userId: string;
        plan: 'pro' | 'enterprise';
      };
    };
  };
}

interface RazorpayWebhookEvent {
  event: string;
  payload: {
    payment: {
      entity: {
        id: string;
        amount: number;
        currency: string;
        status: string;
        notes: {
          userId: string;
          plan: 'pro' | 'enterprise';
        };
      };
    };
    subscription?: {
      entity: {
        id: string;
        status: string;
        customer_id: string;
      };
    };
  };
}

// Stripe Webhook Handler
export const handleStripeWebhook = async (event: StripeWebhookEvent) => {
  const proService = ProFeaturesService.getInstance();
  
  console.log(`🔔 Stripe webhook received: ${event.type}`);
  
  switch (event.type) {
    case 'checkout.session.completed':
      // Payment successful - activate Pro features
      const userId = event.data.object.metadata?.userId;
      const plan = event.data.object.metadata?.plan;
      
      if (userId && plan) {
        if (plan === 'pro') {
          proService.activateProPlan();
          await updateUserMetadata(userId, { 
            isPaidSubscriber: true, 
            plan: 'pro',
            subscriptionId: event.data.object.id,
            activatedAt: new Date().toISOString()
          });
          console.log(`✅ Pro plan activated for user ${userId}`);
        } else if (plan === 'enterprise') {
          proService.activateEnterprisePlan();
          await updateUserMetadata(userId, { 
            isPaidSubscriber: true, 
            plan: 'enterprise',
            subscriptionId: event.data.object.id,
            activatedAt: new Date().toISOString()
          });
          console.log(`✅ Enterprise plan activated for user ${userId}`);
        }
        
        // Send welcome email
        await sendWelcomeEmail(userId, plan);
      }
      break;
      
    case 'customer.subscription.deleted':
      // Subscription cancelled - deactivate Pro features
      const cancelledUserId = await getUserIdFromCustomer(event.data.object.customer);
      if (cancelledUserId) {
        proService.deactivateProFeatures();
        await updateUserMetadata(cancelledUserId, { 
          isPaidSubscriber: false, 
          plan: 'free',
          cancelledAt: new Date().toISOString()
        });
        console.log(`❌ Subscription cancelled for user ${cancelledUserId}`);
        
        // Send cancellation email
        await sendCancellationEmail(cancelledUserId);
      }
      break;
      
    case 'invoice.payment_failed':
      // Payment failed - send notification but don't deactivate immediately
      const failedUserId = await getUserIdFromCustomer(event.data.object.customer);
      if (failedUserId) {
        await sendPaymentFailedEmail(failedUserId);
        console.log(`⚠️ Payment failed for user ${failedUserId}`);
      }
      break;
      
    case 'customer.subscription.updated':
      // Plan changed (upgrade/downgrade)
      const updatedUserId = await getUserIdFromCustomer(event.data.object.customer);
      const newPlan = event.data.object.metadata?.plan;
      
      if (updatedUserId && newPlan) {
        if (newPlan === 'enterprise') {
          proService.activateEnterprisePlan();
        } else if (newPlan === 'pro') {
          proService.activateProPlan();
        }
        
        await updateUserMetadata(updatedUserId, { 
          plan: newPlan,
          updatedAt: new Date().toISOString()
        });
        console.log(`🔄 Plan updated to ${newPlan} for user ${updatedUserId}`);
      }
      break;
      
    default:
      console.log(`🤷 Unhandled Stripe event type: ${event.type}`);
  }
};

// Razorpay Webhook Handler
export const handleRazorpayWebhook = async (event: RazorpayWebhookEvent) => {
  const proService = ProFeaturesService.getInstance();
  
  console.log(`🔔 Razorpay webhook received: ${event.event}`);
  
  switch (event.event) {
    case 'payment.captured':
      // Payment successful
      const payment = event.payload.payment.entity;
      const userId = payment.notes.userId;
      const plan = payment.notes.plan;
      
      if (userId && plan) {
        if (plan === 'pro') {
          proService.activateProPlan();
        } else if (plan === 'enterprise') {
          proService.activateEnterprisePlan();
        }
        
        await updateUserMetadata(userId, { 
          isPaidSubscriber: true, 
          plan: plan,
          paymentId: payment.id,
          activatedAt: new Date().toISOString()
        });
        
        console.log(`✅ ${plan} plan activated for user ${userId} (₹${payment.amount/100})`);
        await sendWelcomeEmail(userId, plan);
      }
      break;
      
    case 'payment.failed':
      // Payment failed
      const failedPayment = event.payload.payment.entity;
      const failedUserId = failedPayment.notes.userId;
      
      if (failedUserId) {
        await sendPaymentFailedEmail(failedUserId);
        console.log(`❌ Payment failed for user ${failedUserId}`);
      }
      break;
      
    case 'subscription.cancelled':
      // Subscription cancelled
      const subscription = event.payload.subscription?.entity;
      if (subscription) {
        const cancelledUserId = await getUserIdFromSubscription(subscription.id);
        if (cancelledUserId) {
          proService.deactivateProFeatures();
          await updateUserMetadata(cancelledUserId, { 
            isPaidSubscriber: false, 
            plan: 'free',
            cancelledAt: new Date().toISOString()
          });
          console.log(`❌ Subscription cancelled for user ${cancelledUserId}`);
        }
      }
      break;
      
    default:
      console.log(`🤷 Unhandled Razorpay event type: ${event.event}`);
  }
};

// Helper Functions

// Update user metadata in Clerk
const updateUserMetadata = async (userId: string, metadata: Record<string, any>) => {
  try {
    // In a real app, you'd use Clerk's backend API
    // const clerkClient = require('@clerk/clerk-sdk-node');
    // await clerkClient.users.updateUserMetadata(userId, { publicMetadata: metadata });
    
    console.log(`📝 Would update user ${userId} metadata:`, metadata);
    
    // For demo purposes, store in localStorage
    const existingData = JSON.parse(localStorage.getItem('user-metadata') || '{}');
    existingData[userId] = { ...existingData[userId], ...metadata };
    localStorage.setItem('user-metadata', JSON.stringify(existingData));
    
  } catch (error) {
    console.error('Failed to update user metadata:', error);
  }
};

// Get user ID from Stripe customer ID
const getUserIdFromCustomer = async (customerId: string): Promise<string | null> => {
  try {
    // In a real app, you'd query your database
    // const user = await db.users.findOne({ stripeCustomerId: customerId });
    // return user?.id || null;
    
    console.log(`🔍 Would lookup user for customer ${customerId}`);
    return 'demo-user-id'; // Demo return
  } catch (error) {
    console.error('Failed to get user from customer:', error);
    return null;
  }
};

// Get user ID from subscription ID
const getUserIdFromSubscription = async (subscriptionId: string): Promise<string | null> => {
  try {
    // In a real app, you'd query your database
    console.log(`🔍 Would lookup user for subscription ${subscriptionId}`);
    return 'demo-user-id'; // Demo return
  } catch (error) {
    console.error('Failed to get user from subscription:', error);
    return null;
  }
};

// Email notification functions
const sendWelcomeEmail = async (userId: string, plan: string) => {
  console.log(`📧 Would send welcome email to user ${userId} for ${plan} plan`);
  // Implement email sending logic (SendGrid, AWS SES, etc.)
};

const sendCancellationEmail = async (userId: string) => {
  console.log(`📧 Would send cancellation email to user ${userId}`);
  // Implement email sending logic
};

const sendPaymentFailedEmail = async (userId: string) => {
  console.log(`📧 Would send payment failed email to user ${userId}`);
  // Implement email sending logic
};

// Webhook signature verification
export const verifyStripeSignature = (_payload: string, _signature: string, _secret: string): boolean => {
  try {
    // In a real app, use Stripe's signature verification
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // stripe.webhooks.constructEvent(payload, signature, secret);
    
    console.log('🔐 Would verify Stripe signature');
    return true; // Demo return
  } catch (error) {
    console.error('Stripe signature verification failed:', error);
    return false;
  }
};

export const verifyRazorpaySignature = (_payload: string, _signature: string, _secret: string): boolean => {
  try {
    // In a real app, use Razorpay's signature verification
    // const crypto = require('crypto');
    // const expectedSignature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    // return expectedSignature === signature;
    
    console.log('🔐 Would verify Razorpay signature');
    return true; // Demo return
  } catch (error) {
    console.error('Razorpay signature verification failed:', error);
    return false;
  }
};

// Example API endpoint handlers (for Next.js API routes or Express)
export const stripeWebhookHandler = async (req: any, res: any) => {
  const signature = req.headers['stripe-signature'];
  const payload = req.body;
  
  if (!verifyStripeSignature(payload, signature, process.env.STRIPE_WEBHOOK_SECRET!)) {
    return res.status(400).send('Invalid signature');
  }
  
  try {
    await handleStripeWebhook(JSON.parse(payload));
    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook handler error:', error);
    res.status(500).send('Webhook handler failed');
  }
};

export const razorpayWebhookHandler = async (req: any, res: any) => {
  const signature = req.headers['x-razorpay-signature'];
  const payload = req.body;
  
  if (!verifyRazorpaySignature(payload, signature, process.env.RAZORPAY_WEBHOOK_SECRET!)) {
    return res.status(400).send('Invalid signature');
  }
  
  try {
    await handleRazorpayWebhook(JSON.parse(payload));
    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook handler error:', error);
    res.status(500).send('Webhook handler failed');
  }
};

import { BillingAddress,
    CardInstrument,
    Cart,
    Checkout,
    Consignment,
    Customer,
    Order,
    PaymentMethod,
    ShippingAddress,
    StoreConfig } from '@bigcommerce/checkout-sdk/core'; // eslint-disable-line import/no-unresolved

export default interface PaymentIntegrationSelectors {
    getBillingAddress(): BillingAddress | undefined;
    getBillingAddressOrThrow(): BillingAddress;

    getCart(): Cart | undefined;
    getCartOrThrow(): Cart;

    getCheckout(): Checkout | undefined;
    getCheckoutOrThrow(): Checkout;

    getStoreConfig(): StoreConfig | undefined;
    getStoreConfigOrThrow(): StoreConfig;

    getConsignments(): Consignment[] | undefined;
    getConsignmentsOrThrow(): Consignment[];

    getCustomer(): Customer | undefined;
    getCustomerOrThrow(): Customer;

    getCardInstrument(instrumentId: string): CardInstrument | undefined;
    getCardInstrumentOrThrow(instrumentId: string): CardInstrument;

    getOrder(): Order | undefined;
    getOrderOrThrow(): Order;

    getPaymentToken(): string | undefined;
    getPaymentTokenOrThrow(): string;

    getPaymentId(): { providerId: string; gatewayId?: string } | undefined;
    getPaymentIdOrThrow(): { providerId: string; gatewayId?: string };

    getPaymentStatus(): string | undefined;
    getPaymentStatusOrThrow(): string;

    getPaymentRedirectUrl(): string | undefined;
    getPaymentRedirectUrlOrThrow(): string;

    getPaymentMethod(methodId: string, gatewayId?: string): PaymentMethod | undefined;
    getPaymentMethodOrThrow(methodId: string, gatewayId?: string): PaymentMethod;

    getShippingAddress(): ShippingAddress | undefined;
    getShippingAddressOrThrow(): ShippingAddress;

    isPaymentDataRequired(useStoreCredit?: boolean): boolean;
    isPaymentMethodInitialized(methodId: string): boolean;
}


import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  Globe,
  Bell,
  Shield,
  DollarSign,
  Percent,
  Clock,
  Send,
} from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  const [businessSettings, setBusinessSettings] = useState({
    name: "Mosaic Grove",
    email: "contact@mosaicgrove.com",
    phone: "+233 20 123 4567",
    address: "123 Farmersville Road, Accra, Ghana",
    currency: "USD",
    weightUnit: "g",
    logoUrl: "/logo.png",
    description: "Sustainable agricultural products from Ghana, supporting local farmers and communities while providing high-quality organic goods."
  });

  const [shippingSettings, setShippingSettings] = useState({
    enableFreeShipping: true,
    freeShippingThreshold: 50,
    localDeliveryEnabled: true,
    localDeliveryFee: 5,
    internationalShippingEnabled: true,
    internationalShippingFee: 25,
    expressShippingEnabled: true,
    expressShippingFee: 15
  });

  const [taxSettings, setTaxSettings] = useState({
    enableTaxes: true,
    defaultTaxRate: 7.5,
    enableVAT: false,
    vatRate: 20,
    enableSpecialTaxRules: false,
    displayTaxesInCart: true
  });

  const [emailSettings, setEmailSettings] = useState({
    orderConfirmation: true,
    orderShipped: true,
    orderDelivered: true,
    abandonedCart: false,
    newsletterEnabled: true,
    senderName: "Mosaic Grove",
    senderEmail: "orders@mosaicgrove.com",
    footerText: "Thank you for shopping with Mosaic Grove! For any questions, contact our support team."
  });

  const [discountSettings, setDiscountSettings] = useState({
    enableDiscounts: true,
    maxDiscountPercent: 30,
    enableCoupons: true,
    enableBulkDiscounts: true,
    enableReferralDiscounts: false,
    firstOrderDiscountEnabled: true,
    firstOrderDiscountPercent: 10
  });

  const handleSaveBusinessSettings = () => {
    // In a real app, you would save the settings to a database
    toast({
      title: "Settings Saved",
      description: "Business settings have been updated.",
    });
  };

  const handleSaveShippingSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Shipping & delivery settings have been updated.",
    });
  };

  const handleSaveTaxSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Tax settings have been updated.",
    });
  };

  const handleSaveEmailSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Email notification settings have been updated.",
    });
  };

  const handleSaveDiscountSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Discount settings have been updated.",
    });
  };

  const handleTestEmail = () => {
    toast({
      title: "Test Email Sent",
      description: "A test email has been sent to the configured sender address.",
    });
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-mosaic-green-dark animate-fade-in">
            System Settings
          </h1>
        </div>

        <Tabs defaultValue="business" className="animate-fade-in">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="tax">Tax</TabsTrigger>
            <TabsTrigger value="emails">Emails</TabsTrigger>
            <TabsTrigger value="discounts">Discounts</TabsTrigger>
          </TabsList>

          <TabsContent value="business">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe size={20} /> Business Information
                </CardTitle>
                <CardDescription>
                  Update your business details and store information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="business-name" className="flex items-center gap-2">
                      <User size={16} /> Business Name
                    </Label>
                    <Input
                      id="business-name"
                      value={businessSettings.name}
                      onChange={(e) => setBusinessSettings({
                        ...businessSettings,
                        name: e.target.value
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="business-email" className="flex items-center gap-2">
                      <Mail size={16} /> Business Email
                    </Label>
                    <Input
                      id="business-email"
                      value={businessSettings.email}
                      onChange={(e) => setBusinessSettings({
                        ...businessSettings,
                        email: e.target.value
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="business-phone" className="flex items-center gap-2">
                      <Phone size={16} /> Business Phone
                    </Label>
                    <Input
                      id="business-phone"
                      value={businessSettings.phone}
                      onChange={(e) => setBusinessSettings({
                        ...businessSettings,
                        phone: e.target.value
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="business-address" className="flex items-center gap-2">
                      <MapPin size={16} /> Business Address
                    </Label>
                    <Input
                      id="business-address"
                      value={businessSettings.address}
                      onChange={(e) => setBusinessSettings({
                        ...businessSettings,
                        address: e.target.value
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currency" className="flex items-center gap-2">
                      <DollarSign size={16} /> Currency
                    </Label>
                    <Select 
                      value={businessSettings.currency}
                      onValueChange={(value) => setBusinessSettings({
                        ...businessSettings,
                        currency: value
                      })}
                    >
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                        <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                        <SelectItem value="GHS">GHS - Ghanaian Cedi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weight-unit" className="flex items-center gap-2">
                      <Truck size={16} /> Weight Unit
                    </Label>
                    <Select 
                      value={businessSettings.weightUnit}
                      onValueChange={(value) => setBusinessSettings({
                        ...businessSettings,
                        weightUnit: value
                      })}
                    >
                      <SelectTrigger id="weight-unit">
                        <SelectValue placeholder="Select weight unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="g">Grams (g)</SelectItem>
                        <SelectItem value="kg">Kilograms (kg)</SelectItem>
                        <SelectItem value="oz">Ounces (oz)</SelectItem>
                        <SelectItem value="lb">Pounds (lb)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="store-description" className="flex items-center gap-2">
                    <Globe size={16} /> Store Description
                  </Label>
                  <Textarea
                    id="store-description"
                    value={businessSettings.description}
                    onChange={(e) => setBusinessSettings({
                      ...businessSettings,
                      description: e.target.value
                    })}
                    rows={4}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  className="bg-mosaic-green hover:bg-mosaic-green-dark"
                  onClick={handleSaveBusinessSettings}
                >
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="shipping">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck size={20} /> Shipping & Delivery
                </CardTitle>
                <CardDescription>
                  Configure shipping options and delivery methods.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Free Shipping</Label>
                        <p className="text-sm text-gray-500">
                          Offer free shipping on orders above a threshold
                        </p>
                      </div>
                      <Switch
                        checked={shippingSettings.enableFreeShipping}
                        onCheckedChange={(value) => setShippingSettings({
                          ...shippingSettings,
                          enableFreeShipping: value
                        })}
                      />
                    </div>
                    
                    {shippingSettings.enableFreeShipping && (
                      <div className="space-y-2 pl-6 border-l-2 border-mosaic-earth-light">
                        <Label htmlFor="free-shipping-threshold">
                          Free Shipping Threshold ($)
                        </Label>
                        <Input
                          id="free-shipping-threshold"
                          type="number"
                          min="0"
                          step="0.01"
                          value={shippingSettings.freeShippingThreshold}
                          onChange={(e) => setShippingSettings({
                            ...shippingSettings,
                            freeShippingThreshold: parseFloat(e.target.value)
                          })}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Local Delivery</Label>
                        <p className="text-sm text-gray-500">
                          Offer local delivery options
                        </p>
                      </div>
                      <Switch
                        checked={shippingSettings.localDeliveryEnabled}
                        onCheckedChange={(value) => setShippingSettings({
                          ...shippingSettings,
                          localDeliveryEnabled: value
                        })}
                      />
                    </div>
                    
                    {shippingSettings.localDeliveryEnabled && (
                      <div className="space-y-2 pl-6 border-l-2 border-mosaic-earth-light">
                        <Label htmlFor="local-delivery-fee">
                          Local Delivery Fee ($)
                        </Label>
                        <Input
                          id="local-delivery-fee"
                          type="number"
                          min="0"
                          step="0.01"
                          value={shippingSettings.localDeliveryFee}
                          onChange={(e) => setShippingSettings({
                            ...shippingSettings,
                            localDeliveryFee: parseFloat(e.target.value)
                          })}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">International Shipping</Label>
                        <p className="text-sm text-gray-500">
                          Enable international shipping options
                        </p>
                      </div>
                      <Switch
                        checked={shippingSettings.internationalShippingEnabled}
                        onCheckedChange={(value) => setShippingSettings({
                          ...shippingSettings,
                          internationalShippingEnabled: value
                        })}
                      />
                    </div>
                    
                    {shippingSettings.internationalShippingEnabled && (
                      <div className="space-y-2 pl-6 border-l-2 border-mosaic-earth-light">
                        <Label htmlFor="international-shipping-fee">
                          International Shipping Base Fee ($)
                        </Label>
                        <Input
                          id="international-shipping-fee"
                          type="number"
                          min="0"
                          step="0.01"
                          value={shippingSettings.internationalShippingFee}
                          onChange={(e) => setShippingSettings({
                            ...shippingSettings,
                            internationalShippingFee: parseFloat(e.target.value)
                          })}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Express Shipping</Label>
                        <p className="text-sm text-gray-500">
                          Offer express shipping options
                        </p>
                      </div>
                      <Switch
                        checked={shippingSettings.expressShippingEnabled}
                        onCheckedChange={(value) => setShippingSettings({
                          ...shippingSettings,
                          expressShippingEnabled: value
                        })}
                      />
                    </div>
                    
                    {shippingSettings.expressShippingEnabled && (
                      <div className="space-y-2 pl-6 border-l-2 border-mosaic-earth-light">
                        <Label htmlFor="express-shipping-fee">
                          Express Shipping Fee ($)
                        </Label>
                        <Input
                          id="express-shipping-fee"
                          type="number"
                          min="0"
                          step="0.01"
                          value={shippingSettings.expressShippingFee}
                          onChange={(e) => setShippingSettings({
                            ...shippingSettings,
                            expressShippingFee: parseFloat(e.target.value)
                          })}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  className="bg-mosaic-green hover:bg-mosaic-green-dark"
                  onClick={handleSaveShippingSettings}
                >
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="tax">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard size={20} /> Tax Configuration
                </CardTitle>
                <CardDescription>
                  Configure tax settings for your store.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Enable Sales Tax</Label>
                        <p className="text-sm text-gray-500">
                          Apply sales tax to applicable orders
                        </p>
                      </div>
                      <Switch
                        checked={taxSettings.enableTaxes}
                        onCheckedChange={(value) => setTaxSettings({
                          ...taxSettings,
                          enableTaxes: value
                        })}
                      />
                    </div>
                    
                    {taxSettings.enableTaxes && (
                      <div className="space-y-2 pl-6 border-l-2 border-mosaic-earth-light">
                        <Label htmlFor="default-tax-rate">
                          Default Tax Rate (%)
                        </Label>
                        <Input
                          id="default-tax-rate"
                          type="number"
                          min="0"
                          step="0.1"
                          value={taxSettings.defaultTaxRate}
                          onChange={(e) => setTaxSettings({
                            ...taxSettings,
                            defaultTaxRate: parseFloat(e.target.value)
                          })}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Enable VAT</Label>
                        <p className="text-sm text-gray-500">
                          Apply Value Added Tax for applicable regions
                        </p>
                      </div>
                      <Switch
                        checked={taxSettings.enableVAT}
                        onCheckedChange={(value) => setTaxSettings({
                          ...taxSettings,
                          enableVAT: value
                        })}
                      />
                    </div>
                    
                    {taxSettings.enableVAT && (
                      <div className="space-y-2 pl-6 border-l-2 border-mosaic-earth-light">
                        <Label htmlFor="vat-rate">
                          VAT Rate (%)
                        </Label>
                        <Input
                          id="vat-rate"
                          type="number"
                          min="0"
                          step="0.1"
                          value={taxSettings.vatRate}
                          onChange={(e) => setTaxSettings({
                            ...taxSettings,
                            vatRate: parseFloat(e.target.value)
                          })}
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Special Tax Rules</Label>
                      <p className="text-sm text-gray-500">
                        Enable special tax rules for different regions or product types
                      </p>
                    </div>
                    <Switch
                      checked={taxSettings.enableSpecialTaxRules}
                      onCheckedChange={(value) => setTaxSettings({
                        ...taxSettings,
                        enableSpecialTaxRules: value
                      })}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Display Taxes in Cart</Label>
                      <p className="text-sm text-gray-500">
                        Show tax calculations in the cart and checkout
                      </p>
                    </div>
                    <Switch
                      checked={taxSettings.displayTaxesInCart}
                      onCheckedChange={(value) => setTaxSettings({
                        ...taxSettings,
                        displayTaxesInCart: value
                      })}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  className="bg-mosaic-green hover:bg-mosaic-green-dark"
                  onClick={handleSaveTaxSettings}
                >
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="emails">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail size={20} /> Email Notifications
                </CardTitle>
                <CardDescription>
                  Configure transactional emails and notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sender-name" className="flex items-center gap-2">
                      <User size={16} /> Sender Name
                    </Label>
                    <Input
                      id="sender-name"
                      value={emailSettings.senderName}
                      onChange={(e) => setEmailSettings({
                        ...emailSettings,
                        senderName: e.target.value
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sender-email" className="flex items-center gap-2">
                      <Mail size={16} /> Sender Email
                    </Label>
                    <Input
                      id="sender-email"
                      value={emailSettings.senderEmail}
                      onChange={(e) => setEmailSettings({
                        ...emailSettings,
                        senderEmail: e.target.value
                      })}
                    />
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium flex items-center gap-2 mb-3">
                    <Bell size={18} /> Notification Settings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="order-confirmation" className="cursor-pointer">
                        Order Confirmation Emails
                      </Label>
                      <Switch
                        id="order-confirmation"
                        checked={emailSettings.orderConfirmation}
                        onCheckedChange={(value) => setEmailSettings({
                          ...emailSettings,
                          orderConfirmation: value
                        })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="order-shipped" className="cursor-pointer">
                        Order Shipped Emails
                      </Label>
                      <Switch
                        id="order-shipped"
                        checked={emailSettings.orderShipped}
                        onCheckedChange={(value) => setEmailSettings({
                          ...emailSettings,
                          orderShipped: value
                        })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="order-delivered" className="cursor-pointer">
                        Order Delivered Emails
                      </Label>
                      <Switch
                        id="order-delivered"
                        checked={emailSettings.orderDelivered}
                        onCheckedChange={(value) => setEmailSettings({
                          ...emailSettings,
                          orderDelivered: value
                        })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="abandoned-cart" className="cursor-pointer">
                        Abandoned Cart Reminders
                      </Label>
                      <Switch
                        id="abandoned-cart"
                        checked={emailSettings.abandonedCart}
                        onCheckedChange={(value) => setEmailSettings({
                          ...emailSettings,
                          abandonedCart: value
                        })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="newsletter" className="cursor-pointer">
                        Newsletter Subscription
                      </Label>
                      <Switch
                        id="newsletter"
                        checked={emailSettings.newsletterEnabled}
                        onCheckedChange={(value) => setEmailSettings({
                          ...emailSettings,
                          newsletterEnabled: value
                        })}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email-footer" className="flex items-center gap-2">
                    <Shield size={16} /> Email Footer Text
                  </Label>
                  <Textarea
                    id="email-footer"
                    value={emailSettings.footerText}
                    onChange={(e) => setEmailSettings({
                      ...emailSettings,
                      footerText: e.target.value
                    })}
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={handleTestEmail}
                >
                  <Send size={16} /> Send Test Email
                </Button>
                
                <Button 
                  className="bg-mosaic-green hover:bg-mosaic-green-dark"
                  onClick={handleSaveEmailSettings}
                >
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="discounts">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent size={20} /> Discounts & Promotions
                </CardTitle>
                <CardDescription>
                  Configure promotional discounts and special offers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Enable Discounts</Label>
                        <p className="text-sm text-gray-500">
                          Allow discounts on products
                        </p>
                      </div>
                      <Switch
                        checked={discountSettings.enableDiscounts}
                        onCheckedChange={(value) => setDiscountSettings({
                          ...discountSettings,
                          enableDiscounts: value
                        })}
                      />
                    </div>
                    
                    {discountSettings.enableDiscounts && (
                      <div className="space-y-2 pl-6 border-l-2 border-mosaic-earth-light">
                        <Label htmlFor="max-discount">
                          Maximum Discount (%)
                        </Label>
                        <Input
                          id="max-discount"
                          type="number"
                          min="0"
                          max="100"
                          value={discountSettings.maxDiscountPercent}
                          onChange={(e) => setDiscountSettings({
                            ...discountSettings,
                            maxDiscountPercent: parseInt(e.target.value)
                          })}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Enable Coupon Codes</Label>
                        <p className="text-sm text-gray-500">
                          Allow customers to use coupon codes
                        </p>
                      </div>
                      <Switch
                        checked={discountSettings.enableCoupons}
                        onCheckedChange={(value) => setDiscountSettings({
                          ...discountSettings,
                          enableCoupons: value
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Bulk Discounts</Label>
                        <p className="text-sm text-gray-500">
                          Apply discounts for bulk purchases
                        </p>
                      </div>
                      <Switch
                        checked={discountSettings.enableBulkDiscounts}
                        onCheckedChange={(value) => setDiscountSettings({
                          ...discountSettings,
                          enableBulkDiscounts: value
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Referral Discounts</Label>
                        <p className="text-sm text-gray-500">
                          Reward customers who refer others
                        </p>
                      </div>
                      <Switch
                        checked={discountSettings.enableReferralDiscounts}
                        onCheckedChange={(value) => setDiscountSettings({
                          ...discountSettings,
                          enableReferralDiscounts: value
                        })}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">First Order Discount</Label>
                      <p className="text-sm text-gray-500">
                        Apply a special discount for first-time customers
                      </p>
                    </div>
                    <Switch
                      checked={discountSettings.firstOrderDiscountEnabled}
                      onCheckedChange={(value) => setDiscountSettings({
                        ...discountSettings,
                        firstOrderDiscountEnabled: value
                      })}
                    />
                  </div>
                  
                  {discountSettings.firstOrderDiscountEnabled && (
                    <div className="space-y-2 pl-6 border-l-2 border-mosaic-earth-light">
                      <Label htmlFor="first-order-discount">
                        First Order Discount (%)
                      </Label>
                      <Input
                        id="first-order-discount"
                        type="number"
                        min="0"
                        max="100"
                        value={discountSettings.firstOrderDiscountPercent}
                        onChange={(e) => setDiscountSettings({
                          ...discountSettings,
                          firstOrderDiscountPercent: parseInt(e.target.value)
                        })}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  className="bg-mosaic-green hover:bg-mosaic-green-dark"
                  onClick={handleSaveDiscountSettings}
                >
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;

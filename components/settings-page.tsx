"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function SettingsPage() {
  return (
    <div className="p-4">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="privacy" className="border-zinc-800">
              <AccordionTrigger className="text-white hover:text-red-500 hover:no-underline py-4">
                Privacy Policy
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                <div className="space-y-4 text-sm">
                  <p>
                    Winter Prep Guide is committed to protecting your privacy. This Privacy Policy explains how we
                    collect, use, and safeguard your information when you use our mobile application.
                  </p>
                  <h3 className="text-white font-medium">Information Collection</h3>
                  <p>
                    We only store data locally on your device using localStorage. We do not collect or transmit any
                    personal information to external servers.
                  </p>
                  <h3 className="text-white font-medium">Data Usage</h3>
                  <p>
                    The data you input (temperature, humidity, chicken count) is used solely to provide you with
                    recommendations and track your coop conditions over time.
                  </p>
                  <h3 className="text-white font-medium">Data Security</h3>
                  <p>
                    Since all data is stored locally on your device, you have complete control over your information.
                    Clearing your browser data or uninstalling the app will remove all stored information.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="terms" className="border-zinc-800">
              <AccordionTrigger className="text-white hover:text-red-500 hover:no-underline py-4">
                Terms of Use
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                <div className="space-y-4 text-sm">
                  <p>
                    By using the Winter Prep Guide application, you agree to these Terms of Use. Please read them
                    carefully.
                  </p>
                  <h3 className="text-white font-medium">Application Use</h3>
                  <p>
                    This application is designed to provide guidance for maintaining optimal conditions in chicken coops
                    during winter. The recommendations are general in nature and may need to be adjusted based on your
                    specific climate and circumstances.
                  </p>
                  <h3 className="text-white font-medium">Limitations</h3>
                  <p>
                    While we strive to provide accurate information, we make no warranties regarding the completeness,
                    reliability, or accuracy of this information. Any action you take based on the application's
                    recommendations is strictly at your own risk.
                  </p>
                  <h3 className="text-white font-medium">Modifications</h3>
                  <p>
                    We reserve the right to modify or discontinue the application at any time without notice. We will
                    not be liable to you or any third party for any modification or discontinuation of the service.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="support" className="border-zinc-800">
              <AccordionTrigger className="text-white hover:text-red-500 hover:no-underline py-4">
                Support
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                <div className="space-y-4 text-sm">
                  <p>
                    We're here to help you get the most out of Winter Prep Guide. If you have any questions, feedback,
                    or need assistance, please reach out to us.
                  </p>
                  <h3 className="text-white font-medium">Contact Information</h3>
                  <p>
                    Email: support@winterprepguide.com
                    <br />
                    Response Time: Within 48 hours
                  </p>
                  <h3 className="text-white font-medium">Frequently Asked Questions</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-white font-medium">Q: How accurate are the temperature recommendations?</p>
                      <p>
                        A: Our recommendations are based on general best practices for chicken coops in winter
                        conditions. Your specific needs may vary based on chicken breed, climate, and coop construction.
                      </p>
                    </div>
                    <div>
                      <p className="text-white font-medium">Q: Will my data be lost if I update the app?</p>
                      <p>
                        A: No, your data is stored locally and should persist through updates. However, we recommend
                        periodically backing up important information.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}


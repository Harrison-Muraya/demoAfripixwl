import { MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/RequestDialog";

const WHATSAPP_NUMBER = "254726688832";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Afripixel, I'd like to talk about a website for my business.",
)}`;

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 px-3 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
        <Button variant="outline" size="lg" asChild>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="w-full">
            <MessageCircle className="h-4 w-4" />
            WhatsApp Us
          </a>
        </Button>
        <RequestDialog>
          <Button variant="hero" size="lg" className="w-full">
            <Sparkles className="h-4 w-4" />
            Get Started
          </Button>
        </RequestDialog>
      </div>
    </div>
  );
}

import {
  Briefcase,
  HardHat,
  GraduationCap,
  Plane,
  ShoppingBag,
  HeartPulse,
  Wheat,
  Cpu,
  Camera,
  Building2,
  SprayCan,
  Layers,
  type LucideIcon,
} from "lucide-react";

export const industryIcons: Record<string, LucideIcon> = {
  "business-professional-services": Briefcase,
  "construction-engineering": HardHat,
  "education-training": GraduationCap,
  "travel-hospitality": Plane,
  "retail-ecommerce": ShoppingBag,
  "healthcare-wellness": HeartPulse,
  "agriculture-food": Wheat,
  "technology-digital": Cpu,
  "creative-media-events": Camera,
  "real-estate-property": Building2,
  "cleaning-hygiene-pest-control": SprayCan,
};

export const industryIconFallback: LucideIcon = Layers;

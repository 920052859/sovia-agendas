"use client";

import { useEffect, useRef } from "react";
import { useStore } from "../context/store";
import { useActiveSection } from "../lib/useActiveSection";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { SCENE_ORDER } from "../lib/scenes";
import LiveAgendaStage from "./previews/LiveAgendaStage";
import TemplateGallery from "./TemplateGallery";
import Questionnaire from "./Questionnaire";
import PhysicalCustomizer from "./PhysicalCustomizer";
import Personalizer from "./Personalizer";
import InternalLayoutPicker from "./InternalLayoutPicker";
import StickerBoard from "./StickerBoard";
import VisionBoardSection from "./VisionBoardSection";
import PackPicker from "./PackPicker";
import OrderSummary from "./OrderSummary";
import BackCover from "./previews/BackCover";

export default function LiveStudio() {
  const templatesRef = useRef<HTMLDivElement>(null);
  const quizRef = useRef<HTMLDivElement>(null);
  const materialsRef = useRef<HTMLDivElement>(null);
  const typographyRef = useRef<HTMLDivElement>(null);
  const interiorRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const refs = [templatesRef, quizRef, materialsRef, typographyRef, interiorRef, calendarRef, visionRef, summaryRef];
  const flowRef = useRef<HTMLDivElement>(null);
  const activeStage = useActiveSection(refs, SCENE_ORDER);
  const { t } = useStore();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const blocks = refs.map((ref) => ref.current).filter((el): el is HTMLDivElement => Boolean(el));
      blocks.forEach((block) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 46 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
      ScrollTrigger.refresh();
    }, flowRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="studio-grid">
      <div className="studio-flow" ref={flowRef}>
        <div ref={templatesRef} className="scene-block">
          <TemplateGallery />
        </div>
        <div ref={quizRef} className="scene-block">
          <Questionnaire />
        </div>
        <div ref={materialsRef} className="scene-block">
          <PhysicalCustomizer />
        </div>
        <div ref={typographyRef} className="scene-block">
          <Personalizer />
        </div>
        <div ref={interiorRef} className="scene-block">
          <InternalLayoutPicker />
        </div>
        <div ref={calendarRef} className="scene-block">
          <StickerBoard />
        </div>
        <div ref={visionRef} className="scene-block">
          <VisionBoardSection />
        </div>
        <div ref={summaryRef} className="scene-block scene-summary">
          <PackPicker />
          <BackCover />
          <OrderSummary />
        </div>
      </div>

      <div className="studio-rail">
        <p className="studio-rail-kicker">{t("book.previewKicker")}</p>
        <LiveAgendaStage stage={activeStage as (typeof SCENE_ORDER)[number]} />
      </div>
    </div>
  );
}

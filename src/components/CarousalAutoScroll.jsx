import { isRenderTemplateResult } from "astro/runtime/server/render/astro/render-template.js";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import "../assets/video/css/embla.css";

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({ playOnInit: isRenderTemplateResult }),
  ]);
  const [isPlaying, setIsPlaying] = useState(false);

  //   const {
  //     prevBtnDisabled,
  //     nextBtnDisabled,
  //     onPrevButtonClick,
  //     onNextButtonClick
  //   } = usePrevNextButtons(emblaApi)

  const onButtonAutoplayClick = useCallback(
    (callback) => {
      const autoScroll = emblaApi?.plugins()?.autoScroll;
      if (!autoScroll) return;

      const resetOrStop =
        autoScroll.options.stopOnInteraction === false
          ? autoScroll.reset
          : autoScroll.stop;

      resetOrStop();
      callback();
    },
    [emblaApi]
  );

  const toggleAutoplay = useCallback(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    const playOrStop = autoScroll.isPlaying()
      ? autoScroll.stop
      : autoScroll.play;
    playOrStop();
  }, [emblaApi]);

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    setIsPlaying(autoScroll.isPlaying());
    emblaApi
      .on("autoScroll:play", () => setIsPlaying(true))
      .on("autoScroll:stop", () => setIsPlaying(false))
      .on("reInit", () => setIsPlaying(false));
  }, [emblaApi]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container my-20">
        <div className="embla__slide w-auto h-[600px]  object-cover  " >
              <img
                className="h-full w-fit object-cover rounded-lg"
                src="https://media1.thrillophilia.com/filestore/upsbg2jc0qmauuoq1fzqxvzqqfcz_1596116183_shutterstock_1032365731.jpg"
                alt=""
              />
            </div>
        <div className="embla__slide h-[600px]  object-cover" >
              <img
                className="h-full w-fit object-cover rounded-lg"
                src="https://ghoomlo.pk/wp-content/uploads/2018/07/wsfp.jpg"
                alt=""
              />
            </div>
        <div className="embla__slide h-[600px]  object-cover" >
              <img
                className="h-full w-fit object-cover rounded-lg"
                src="https://maldivesgate.com/wp-content/uploads/2016/09/watersports_01.jpg"
                alt=""
              />
            </div>
        <div className="embla__slide h-[600px]  object-cover" >
              <img
                className="h-full w-fit object-cover rounded-lg"
                src="https://maldivesgate.com/wp-content/uploads/2016/09/watersports_01.jpg"
                alt=""
              />
            </div>
        <div className="embla__slide h-[600px]  object-cover" >
              <img
                className="h-full w-fit object-cover rounded-lg"
                src="https://maldivesgate.com/wp-content/uploads/2016/09/watersports_01.jpg"
                alt=""
              />
            </div>
        <div className="embla__slide h-[600px]  object-cover" >
              <img
                className="h-full w-fit object-cover rounded-lg"
                src="https://maldivesgate.com/wp-content/uploads/2016/09/watersports_01.jpg"
                alt=""
              />
            </div>
        <div className="embla__slide h-[600px]  object-cover" >
              <img
                className="h-full w-fit object-cover rounded-lg"
                src="https://maldivesgate.com/wp-content/uploads/2016/09/watersports_01.jpg"
                alt=""
              />
            </div>
        </div>
      </div>

      {/* <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton
            onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
            disabled={prevBtnDisabled}
          />
          <NextButton
            onClick={() => onButtonAutoplayClick(onNextButtonClick)}
            disabled={nextBtnDisabled}
          />
        </div>

        <button className="embla__play" onClick={toggleAutoplay} type="button">
          {isPlaying ? 'Stop' : 'Start'}
        </button>
      </div> */}
    </div>
  );
};

export default EmblaCarousel;

import React from 'react';
import { X, ArrowRight, ArrowLeft, Play } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useApp } from './AppContext';

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TourStep {
  id: number;
  title: string;
  description: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ isOpen, onClose }) => {
  const { t } = useApp();

  // Construir los pasos con el traductor actual
  const steps = React.useMemo<TourStep[]>(() => [
    {
      id: 1,
      title: t('tour_welcome_title'),
      description: t('tour_welcome_desc'),
      target: 'welcome',
      position: 'bottom',
    },
    {
      id: 2,
      title: t('tour_search_title'),
      description: t('tour_search_desc'),
      target: '[data-tour="search"]',
      position: 'bottom',
    },
    {
      id: 3,
      title: t('tour_filters_title'),
      description: t('tour_filters_desc'),
      target: '[data-tour="sidebar"]',
      position: 'right',
    },
    {
      id: 4,
      title: t('tour_favorites_title'),
      description: t('tour_favorites_desc'),
      target: '[data-tour="favorites"]',
      position: 'top',
    },
    {
      id: 5,
      title: t('tour_navigation_title'),
      description: t('tour_navigation_desc'),
      target: '[data-tour="navigation"]',
      position: 'bottom',
    },
  ], [t]);

  const [currentStep, setCurrentStep] = React.useState(1);
  const [tourPosition, setTourPosition] = React.useState({ top: 0, left: 0 });

  React.useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const step = steps.find(s => s.id === currentStep);
      if (!step) return;

      if (step.target === 'welcome') {
        setTourPosition({
          top: window.innerHeight / 2 - 150,
          left: window.innerWidth / 2 - 200,
        });
        return;
      }

      const targetElement = document.querySelector(step.target);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        let top = rect.top + scrollTop;
        let left = rect.left + scrollLeft;

        switch (step.position) {
          case 'bottom':
            top += rect.height + 10;
            left += rect.width / 2 - 200;
            break;
          case 'top':
            top -= 160;
            left += rect.width / 2 - 200;
            break;
          case 'right':
            top += rect.height / 2 - 75;
            left += rect.width + 10;
            break;
          case 'left':
            top += rect.height / 2 - 75;
            left -= 410;
            break;
        }

        if (left < 10) left = 10;
        if (left + 400 > window.innerWidth) left = window.innerWidth - 410;
        if (top < 10) top = 10;

        setTourPosition({ top, left });

        targetElement.classList.add('tour-highlight');
        setTimeout(() => targetElement.classList.remove('tour-highlight'), 2000);
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [currentStep, isOpen, steps]);

  const nextStep = () => {
    if (currentStep < steps.length) setCurrentStep(s => s + 1);
    else completeTour();
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(s => s - 1);
  };

  const skipTour = () => onClose();

  const completeTour = () => {
    localStorage.setItem('statfut-tour-completed', 'true');
    onClose();
  };

  const currentStepData = steps.find(s => s.id === currentStep);

  if (!isOpen || !currentStepData) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" />
      <Card
        className="fixed z-50 w-96 shadow-2xl border-2 border-primary"
        style={{ top: `${tourPosition.top}px`, left: `${tourPosition.left}px` }}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                {currentStep}
              </div>
              <span className="text-sm text-muted-foreground">
                {t('tour_of')} {steps.length}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={skipTour} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{currentStepData.title}</h3>
            <p className="text-muted-foreground">{currentStepData.description}</p>
          </div>

          <div className="mb-4">
            <div className="flex space-x-1">
              {steps.map(step => (
                <div
                  key={step.id}
                  className={`h-2 flex-1 rounded-full transition-colors ${
                    step.id <= currentStep ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={skipTour} size="sm">
              {t('tour_skip')}
            </Button>

            <div className="flex space-x-2">
              {currentStep > 1 && (
                <Button variant="outline" onClick={prevStep} size="sm">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  {t('tour_prev')}
                </Button>
              )}

              <Button onClick={nextStep} size="sm">
                {currentStep === steps.length ? (
                  <>
                    <Play className="h-4 w-4 mr-1" />
                    {t('tour_start')}
                  </>
                ) : (
                  <>
                    {t('tour_next')}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

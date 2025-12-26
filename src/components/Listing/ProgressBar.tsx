interface ProgressBarProps {
  currentStep: number;
  steps?: string[];
}

const ProgressBar = ({ currentStep, steps }: ProgressBarProps) => {
  const defaultSteps = ['Boat Information', 'Seller Information'];
  const stepLabels = steps || defaultSteps;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl md:text-2xl font-semibold mb-2">
          Listing progress
        </h1>
        <p className="text-xl font-semibold">Step {currentStep}</p>
      </div>
      <div className="flex items-center gap-4 mb-4">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber <= currentStep;

          return (
            <div key={stepNumber} className="flex-1">
              <div
                className={`h-1 rounded-full transition-colors ${
                  isActive ? 'bg-cyan-500' : 'bg-gray-200'
                }`}
              ></div>
              <p
                className={`text-xs mt-1 ${
                  isActive ? 'text-gray-600' : 'text-gray-400'
                }`}
              >
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;

const form = document.querySelector("#calculator-form");
const recommendation = document.querySelector("#recommendation");
const recommendationReason = document.querySelector("#recommendation-reason");
const unitSelect = form.elements.unit;
const weightUnitLabels = document.querySelectorAll("[data-weight-unit]");
let lastResult = null;

function showResult() {
  recommendation.textContent = `Recommended weight: ${lastResult.weight} ${unitSelect.value}`;
  recommendationReason.textContent = lastResult.explanation;
}

unitSelect.addEventListener("change", () => {
  weightUnitLabels.forEach((label) => {
    label.textContent = unitSelect.value;
  });

  if (lastResult) {
    showResult();
  }
});

form.addEventListener("reset", () => {
  lastResult = null;
  weightUnitLabels.forEach((label) => {
    label.textContent = "kg";
  });
  recommendation.textContent = "Your next target will appear here.";
  recommendationReason.textContent = "";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const weight = Number(form.elements.weight.value);
  const reps = Number(form.elements.reps.value);
  const minReps = Number(form.elements.minReps.value);
  const maxReps = Number(form.elements.maxReps.value);
  const increment = Number(form.elements.increment.value);
  const hasEmptyInput = [...form.querySelectorAll("input")].some(
    (input) => input.value.trim() === "",
  );

  if (
    hasEmptyInput ||
    ![weight, reps, minReps, maxReps, increment].every(Number.isFinite) ||
    weight < 0 ||
    increment < 0 ||
    !Number.isInteger(reps) ||
    reps < 0 ||
    !Number.isInteger(minReps) ||
    minReps < 1 ||
    !Number.isInteger(maxReps) ||
    maxReps < minReps
  ) {
    lastResult = null;
    recommendation.textContent =
      "Enter valid positive targets, non-negative weights and reps, and make sure the maximum reps are not below the minimum.";
    recommendationReason.textContent = "";
    return;
  }

  let recommendedWeight;
  let explanation;

  if (reps >= maxReps) {
    recommendedWeight = weight + increment;
    explanation = "You reached the top of your rep range.";
  } else if (reps >= minReps) {
    recommendedWeight = weight;
    explanation = "You are within the target range.";
  } else {
    recommendedWeight = Math.max(0, weight - increment);
    explanation = "You are below the target range, so consider reducing the weight.";
  }

  recommendedWeight = Number(recommendedWeight.toFixed(10));
  lastResult = { weight: recommendedWeight, explanation };
  showResult();
});

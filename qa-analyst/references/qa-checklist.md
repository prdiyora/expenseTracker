# QA Analyst Review Checklist

Use this checklist to rigorously evaluate both the UI/UX design output and the Software Developer's implementation.

## 1. Specification Compliance (Design & Code)
- [ ] Does the implementation meet EVERY requirement stated in the original prompt?
- [ ] Are the specified fonts, colors, and aesthetics strictly followed?
- [ ] Are all required views/pages present and accessible?

## 2. Functional Testing
- [ ] Do all interactive elements (buttons, inputs, toggles) work as expected?
- [ ] Is state managed correctly? (e.g., Does adding a transaction update the balance, charts, and budget bars?)
- [ ] Are inputs validated? (e.g., preventing empty submissions, handling invalid numbers).

## 3. Code Quality & Edge Cases (Developer Review)
- [ ] Are there potential React warnings (e.g., missing keys in lists, dependency array warnings in useEffect/useMemo)?
- [ ] How does the UI handle empty states (e.g., 0 transactions)?
- [ ] How does the UI handle extreme data (e.g., very long merchant names, massive numbers)?
- [ ] Is the code clean, DRY, and free of unnecessary dependencies?

## 4. Visual & UX Polish (Designer Review)
- [ ] Are animations smooth and subtle as requested?
- [ ] Is the layout fully responsive? Does the mobile view function correctly?
- [ ] Are there any alignment issues or harsh borders?

## Feedback Format
When providing feedback, structure it clearly:
1. **Critical Bugs:** Issues that break functionality.
2. **UX/UI Deviations:** Instances where the implementation strays from the design spec.
3. **Code Suggestions:** Opportunities for cleaner or more robust code.

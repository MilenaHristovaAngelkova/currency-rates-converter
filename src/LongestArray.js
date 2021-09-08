const LongestArray = (props) => {
    const longestArr = () => {
        let currRates = Object.values(props.outputConversions).sort();
        currRates.forEach(rate => {
            for (let i = currRates.length - 1; i >= 0; i--) {
                if (Math.abs(currRates[i].toFixed(1) - rate.toFixed(1)) >= 0.6) {
                    currRates.pop();
                }
            }
        })

        return currRates.length;
    }

    return (
        <p>The amount of rates for the selected currency where exchange rates 
        differ among them by no more than 0.5 is <b>{longestArr()}</b>.</p>
    );
}
 
export default LongestArray;
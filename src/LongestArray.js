const LongestArray = (props) => {
    const longestArr = () => {
        let currRates = Object.values(props.outputConversions);
        currRates.sort();
        let max = 0;

        for (let i = 0; i < currRates.length; i++) {
            let count = 1;
            for (let j = i + 1; j < currRates.length; j++) {
                if ((currRates[j].toFixed(1) - currRates[i].toFixed(1)) <= 0.5) {
                    count++;

                    if (count > max) {
                        max = count;
                    }
                } else {
                    count = 1;
                    break;
                }
            }
        }

        return max;
    }

    return (
        <p>The amount of rates for the selected currency where exchange rates 
        differ among them by no more than 0.5 is <b>{longestArr()}</b>.</p>
    );
}
 
export default LongestArray;
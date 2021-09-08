import LongestArray from "./LongestArray";

const ConversionsData = (props) => {
    let outputConversions = {};
    for (let [key, value] of Object.entries(props.currencyRates)) {
        if (key !== props.selectedOption) {
            outputConversions[`${props.selectedOption.toUpperCase()}-${key.toUpperCase()}`] = Number(value);
            outputConversions[`${key.toUpperCase()}-${props.selectedOption.toUpperCase()}`] = 1 / Number(value);
        }
    }

    let group1 = {};
    let group2 = {};
    let group3 = {};

    Object.entries(outputConversions).sort((a, b) => {
        return a[1] - b[1];
    }).map(entry => {
        if (entry[1] < 1) {
           return group1[entry[0]] = entry[1];
        } else if (entry[1] >= 1 && entry[1] < 1.5) {
           return group2[entry[0]] = entry[1];
        } else {
           return group3[entry[0]] = entry[1];
        }
    });

    return (
        <article className="conversions">
            <table>
                <thead>
                    <tr className="table-heading">
                        <th colSpan="2">{`Exchange Rates < 1`}</th>
                    </tr>
                    <tr className="col-headings">
                        <th>Currencies</th>
                        <th>Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(group1).sort((a, b) => {
                            return a[1] - b[1];
                        }).map(entry => {
                            return(
                               <tr key={entry[0]}>
                                    <td>{entry[0]}</td>
                                    <td>{entry[1].toFixed(1)}</td>
                               </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td>Count</td>
                        <td>{Object.keys(group1).length}</td>
                    </tr>
                </tfoot>
            </table>
            <table>
                <thead>
                    <tr className="table-heading">
                        <th colSpan="2">Exchange Rates between 1 and 1.5</th>
                    </tr>
                    <tr className="col-headings">
                        <th>Currencies</th>
                        <th>Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(group2).sort((a, b) => {
                            return a[1] - b[1];
                        }).map(entry => {
                            return(
                               <tr key={entry[0]}>
                                    <td>{entry[0]}</td>
                                    <td>{entry[1].toFixed(1)}</td>
                               </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td>Count</td>
                        <td>{Object.keys(group2).length}</td>
                    </tr>
                </tfoot>
            </table>
            <table>
                <thead>
                    <tr className="table-heading">
                        <th colSpan="2">{`Exchange Rates > 1.5`}</th>
                    </tr>
                    <tr className="col-headings">
                        <th>Currencies</th>
                        <th>Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(group3).sort((a, b) => {
                            return a[1] - b[1];
                        }).map(entry => {
                            return(
                               <tr key={entry[0]}>
                                    <td>{entry[0]}</td>
                                    <td>{entry[1].toFixed(1)}</td>
                               </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td>Count</td>
                        <td>{Object.keys(group3).length}</td>
                    </tr>
                </tfoot>
            </table>
            <LongestArray outputConversions={outputConversions}/>        
        </article>
    );
}
 
export default ConversionsData;
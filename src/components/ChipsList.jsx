import React from 'react';

// interface Chip {
//   label: number | string;
// }

// interface ChipsListProps {
//   chips?: Chip[];
//   max?: number;
//   maxWordLength?: number;
// }

const ChipsList = ({ chips = [], max = 5, maxWordLength = 5 }) => {

    // const chip = {label: 12323};
    if (chips.length <= 0) return null;
    function truncate(text) {
        if(!text) return;
        if(text.toString().length <= maxWordLength ) return text.toString();
        if(text.toString().length > maxWordLength) return ((text.toString().substring(0,maxWordLength)) + '...')
    }

    const visibleChips = chips.slice(0, max);
    const remainingChips = chips.length - visibleChips.length;

    return (
        <div className="chips-container" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {
                visibleChips.map((c, index) => {
                    return (
                        <div key={index} className="chip" style={chipStyle}>
                            {truncate(c.label)}
                        </div>
                    )

                })
            }
            {
                remainingChips && (remainingChips > 0) && (
                    <div className="chip-more" style={moreStyle}>
                        +{remainingChips} more
                    </div>
                )
            }
        </div>
    );
};

// Basic Styling
const chipStyle = {
    padding: '4px 12px',
    borderRadius: '16px',
    background: '#e0e0e0',
    fontSize: '14px'
};

const moreStyle = {
    ...chipStyle,
    background: '#f0f0f0',
    fontWeight: 'bold'
};

export default ChipsList;






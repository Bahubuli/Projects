import React from 'react'
import PropTypes from 'prop-types'

export default function FeedbackStats({feedback}) {

    let avg = feedback.reduce((acc,curr)=>{
        return acc+curr.rating;
    },0)/feedback.length

    // fix decimal place to 1 and replace trailing
    // zeros we don't want 9.0
    avg = avg.toFixed(1).replace(/[.,]0$/,'')
  return (
    <div className = "feedback-stats">
        <h4>{feedback.length} Reviews</h4>
        <h4>Average Rating:{isNaN(avg)?0:avg}</h4>
    </div>
  )
}

FeedbackStats.propTypes =
{
    feedback:PropTypes.array.isRequired
}

import React, { useEffect } from 'react';
import {
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup
} from '@mui/material';
import { useState } from 'react';
import styled from '@emotion/styled';
import { validate } from 'validate.js';

const feedbackFormConstraints = {
  firstVisit: {
    presence: {
      allowEmpty: false
    }
  },
  helpfulWebsite: {
    presence: {
      allowEmpty: false
    }
  },
  robotCheck: {
    presence: {
      allowEmpty: false
    }
  },
  visualRating: {
    presence: {
      allowEmpty: false
    }
  },
  usabilityRating: {
    presence: {
      allowEmpty: false
    }
  },
  speedRating: {
    presence: {
      allowEmpty: false
    }
  }
};

interface FeedbackBase {
  firstVisit: string,
  helpfulWebsite: string,
  robotCheck: string,
  visualRating: string,
  usabilityRating: string,
  speedRating: string
}

/**
 * Displays a feedback form, asking for user's opinion of the website
 */
const FeedbackForm = () => {
  const [feedback, setFeedback] = useState<FeedbackBase>({
    firstVisit: '',
    helpfulWebsite: '',
    robotCheck: '',
    visualRating: '',
    usabilityRating: '',
    speedRating: ''
  });
  const [errors, setErrors] = useState([]);
  const [feedbackReceived, setFeedbackReceived] = useState(false);

  useEffect(() => {
    const newErrors = validate(feedback, feedbackFormConstraints);
    setErrors(newErrors);
  }, [feedback]);

  const onFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeedback((oldFeedback) => ({
      ...oldFeedback,
      [event.target.name]: event.target.value
    }));
  };

  /**
   * Sends the feedback form to the express server and displays a thank you message.
   */
  const sendFeedback = async () => {
    setFeedbackReceived(true);

    fetch('/feedback_form', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(feedback)
    });
  };

  const FormBackground = styled.section`
    border: 3px solid black;
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 70px;
  `;

  const FormItem = styled.section`
    border: 1px solid black;
    padding: 10px;
    margin-bottom: 10px;
  `;

  const YesOrNoRadio = () => {
    return (
      <>
        <FormControlLabel
          label="Yes"
          value="y"
          control={<Radio />}
        />
        <FormControlLabel
          label="No"
          value="n"
          control={<Radio />}
        />
      </>
    );
  };

  const RatingRadio = () => {
    return (
      <>
        <FormControlLabel
          label="Very good"
          value="5"
          control={<Radio />}
        />
        <FormControlLabel
          label="Good"
          value="4"
          control={<Radio />}
        />
        <FormControlLabel
          label="Okay"
          value="3"
          control={<Radio />}
        />
        <FormControlLabel
          label="Bad"
          value="2"
          control={<Radio />}
        />
        <FormControlLabel
          label="Very bad"
          value="1"
          control={<Radio />}
        />
      </>
    );
  };

  return (
    <>
      {feedbackReceived ? (
        <h2 style={{ textAlign: 'center' }}>
          {'Feedback received. Thank you!'}
        </h2>
      ) : (
        <FormBackground>
          <h2 style={{ textAlign: 'center' }}>
            {'Feedback Form'}
          </h2>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12} md={4}>
              <FormItem>
                <FormLabel>
                  {'Is this your first visit?'}
                </FormLabel>
                <RadioGroup
                  name="firstVisit"
                  value={feedback.firstVisit}
                  onChange={onFormChange}
                >
                  <YesOrNoRadio />
                </RadioGroup>
              </FormItem>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormItem>
                <FormLabel>
                  {'Did you find what you were looking for?'}
                </FormLabel>
                <RadioGroup
                  name="helpfulWebsite"
                  value={feedback.helpfulWebsite}
                  onChange={onFormChange}
                >
                  <YesOrNoRadio />
                </RadioGroup>
              </FormItem>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormItem>
                <FormLabel>
                  {'Are you a robot?'}
                </FormLabel>
                <RadioGroup
                  name="robotCheck"
                  value={feedback.robotCheck}
                  onChange={onFormChange}
                >
                  <FormControlLabel
                    label="Beep"
                    value="y"
                    control={<Radio />}
                  />
                  <FormControlLabel
                    label="No"
                    value="n"
                    control={<Radio />}
                  />
                </RadioGroup>
              </FormItem>
            </Grid>

            <Grid item xs={12}>
              <h3 style={{ textAlign: 'center' }}>
                {'Please rate the website in the following categories:'}
              </h3>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormItem>
                <FormLabel>
                  {'Visuals'}
                </FormLabel>
                <RadioGroup
                  name="visualRating"
                  value={feedback.visualRating}
                  onChange={onFormChange}
                >
                  <RatingRadio />
                </RadioGroup>
              </FormItem>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormItem>
                <FormLabel>
                  {'Ease of use'}
                </FormLabel>
                <RadioGroup
                  name="usabilityRating"
                  value={feedback.usabilityRating}
                  onChange={onFormChange}
                >
                  <RatingRadio />
                </RadioGroup>
              </FormItem>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormItem>
                <FormLabel>
                  {'Loading times'}
                </FormLabel>
                <RadioGroup
                  name="speedRating"
                  value={feedback.speedRating}
                  onChange={onFormChange}
                >
                  <RatingRadio />
                </RadioGroup>
              </FormItem>
            </Grid>
          </Grid>

          <Button
            disabled={errors !== undefined}
            variant="contained"
            style={{
              float: 'right',
              marginTop: '10px'
            }}
            onClick={sendFeedback}
          >
            {'Submit'}
          </Button>
        </FormBackground>
      )}
    </>
  );
};

export default FeedbackForm;

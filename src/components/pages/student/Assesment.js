import { Field, FieldArray, Formik, Form } from "formik";
import React, { useEffect, useState, Fragment } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import ReactStars from "react-rating-stars-component";
import {
  retrieveAllKeywords,
  retrieveProperties,
  setAssesmentReview,
} from "../../services/AssesmentService";

const Assesment = ({ activeUser }) => {
  const [keywordsList, setKeywordsList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    retrieveAllKeywords().then((response) => setKeywordsList(response.data));
    retrieveProperties().then((response) => {
      let skills = [];
      response.data.map((skill) => skills.push(skill.skillName));
      setSkillsList(skills);
    });
  }, []);

  function ratingChanged(newRating, skill) {
    setSkills(
      skills.map((element) => {
        if (element.skillName == skill) {
          return { ...element, skillScore: newRating };
        } else return element;
      })
    );

    console.log(skills);
    //console.log(skills);
    // skills.push({ skillName: skill, skillScore: newRating });
    // console.log(skills);
  }

  function onSubmit() {
    let keywords = [...selectedKeywords];
    let skillsObject = { keywords, skills };
    console.log(skillsObject);
    setAssesmentReview(activeUser.id, skillsObject);
  }

  return (
    <div>
      <Fragment>
        <label>Keywords</label>
        <Typeahead
          id="typeahead"
          labelkey="keyword"
          multiple
          onChange={setSelectedKeywords}
          options={keywordsList}
          placeholder="Choose or type..."
          //selected={keywordsSelected}
          allowNew
          newSelectionPrefix="Add new item: "
        />
      </Fragment>

      <Fragment>
        <label>Skills</label>
        <Typeahead
          id="typeahead"
          labelkey="keyword"
          multiple
          onChange={setSelectedSkills}
          options={skillsList}
          placeholder="Choose or type..."
          //selected={keywordsSelected}
          allowNew
          newSelectionPrefix="Add new item: "
        />
      </Fragment>

      <button
        onClick={() => {
          setButtonClicked(!buttonClicked);
          console.log(selectedSkills);
          setSkills(
            selectedSkills.map((skill) => ({
              skillName: skill,
              skillScore: null,
            }))
          );
        }}
      >
        Rate your skills!
      </button>

      {buttonClicked == true && (
        <div>
          <label>Now let's rate your skills</label>
          <div>
            {selectedSkills.map((skill, key) => (
              <div className="row" key={key}>
                <div className="col">{skill}</div>
                <div className="col">
                  <ReactStars
                    count={5}
                    onChange={(newRating) => ratingChanged(newRating, skill)}
                    size={24}
                    activeColor="#ffd700"
                  />
                </div>
              </div>
            ))}
          </div>
          <div>
            <button className="btn btn-success" onClick={onSubmit}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assesment;

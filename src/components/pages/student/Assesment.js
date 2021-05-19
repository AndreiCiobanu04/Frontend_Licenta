import { Field, FieldArray, Formik, Form } from "formik";
import React, { useEffect, useState, Fragment } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import {
  retrieveAllKeywords,
  retrieveProperties,
} from "../../services/AssesmentService";

const Assesment = () => {
  const [keywordsList, setKeywordsList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);

  useEffect(() => {
    retrieveAllKeywords().then((response) => setKeywordsList(response.data));
    retrieveProperties().then((response) => {
      let skills = [];
      response.data.map((skill) => skills.push(skill.skillName));
      setSkillsList(skills);
    });
  }, []);

  function onSubmit(values) {}

  return (
    <div>
      <Fragment>
        <label>Keywords</label>
        <Typeahead
          id="typeahead"
          labelkey="keyword"
          multiple
          //onChange={}
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
          //onChange={}
          options={skillsList}
          placeholder="Choose or type..."
          //selected={keywordsSelected}
          allowNew
          newSelectionPrefix="Add new item: "
        />
      </Fragment>

      <button>Rate your skills!</button>
    </div>
  );
};

export default Assesment;

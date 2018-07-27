import {
  RECEIVE_INITIAL_CAMPAIGN,
  RECEIVE_COURSE_CLONE,
  RECEIVE_COURSE,
  PERSISTED_COURSE,
  UPDATE_COURSE,
  CREATED_COURSE,
  ADD_CAMPAIGN,
  DELETE_CAMPAIGN
} from "../constants";

const initialState = {
  title: '',
  description: '',
  school: '',
  term: '',
  level: '',
  subject: '',
  expected_students: '0',
  start: null,
  end: null,
  timeline_start: null,
  timeline_end: null,
  day_exceptions: '',
  weekdays: '0000000',
  editingSyllabus: false
};


export default function course(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_COURSE:
      return { ...action.data.course };
    case PERSISTED_COURSE:
      return { ...state, ...action.data.course };
    case UPDATE_COURSE:
      return { ...state, ...action.course };
    case CREATED_COURSE:
      return { ...action.data.course };
    case RECEIVE_INITIAL_CAMPAIGN: {
      const campaign = action.data.campaign;
      const newState = {
        ...state,
        initial_campaign_id: campaign.id,
        initial_campaign_title: campaign.title,
        description: campaign.template_description,
        type: campaign.default_course_type,
        passcode: campaign.default_passcode
      };
      return newState;
    }
    case ADD_CAMPAIGN:
    case DELETE_CAMPAIGN:
      return { ...state, published: action.data.course.published };
    case RECEIVE_COURSE_CLONE:
      return { ...action.data.course };
    default:
      return state;
  }
}

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTutor, clear } from "../../redux/tutors/tutors";

const AddTutor = () => {
  const dispatch = useDispatch();

  const [overlay, setOverlay] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const redirection = useNavigate();

  const returnMsg = useSelector((state) => state.tutors);

  const postData = (data) => {
    dispatch(addTutor(data));
  };

  useEffect(() => {
    if (returnMsg) {
      if (returnMsg.message === "Tutor has been created successfully!") {
        setOverlay(true);
        setTimeout(() => {
          dispatch(clear());
          redirection("/");
        }, 2500);
      } else if (returnMsg.message === "Tutor already exists") {
        setOverlay(true);
        setTimeout(() => {
          dispatch(clear());
          setOverlay(false);
        }, 2500);
      }
    }
  }, [returnMsg, dispatch, redirection]);

  return (
    <section className="add-tutor-page">
      <h1>ADD A TUTOR</h1>
      <div class="add-tutor-page-divider"></div>

      <form
        action=""
        className="add-tutor-form"
        onSubmit={handleSubmit(postData)}
      >
        <input
          type="input"
          name="first_name"
          placeholder="First Name"
          {...register("first_name", {
            required: {
              value: true,
              message: "First name is a required field",
            },
            pattern: {
              value: /^((?![0-9.,!?:;_|+\-*\\/=%°@&#§$"'`¨^ˇ()\]<>{}])[\S])+$/i,
              message: "First name can ony include letters",
            },
          })}
        />

        {/* {errors.first_name && (
          <p className="errorMsg">{errors.first_name.message}</p>
        )} */}

        <input
          type="input"
          name="last_name"
          placeholder="Last Name"
          {...register("last_name", {
            required: {
              value: true,
              message: "Last name is a required field",
            },
            pattern: {
              value: /^((?![0-9.,!?:;_|+\-*\\/=%°@&#§$"'`¨^ˇ()\]<>{}])[\S])+$/i,
              message: "Last name can only include letters",
            },
          })}
        />

        {/* {errors.last_name && (
          <p className="errorMsg">{errors.last_name.message}</p>
        )} */}

        <input
          type="input"
          name="photo_url"
          placeholder="domain.com/something.jpg"
          {...register("photo_url", {
            required: {
              value: true,
              message: "Photo url is a required field",
            },
            pattern: {
              value: /([a-z\-_0-9]*\.(jpg|jpeg|png|gif))/i,
              message: "Please add a valid link for the photo url",
            },
          })}
        />

        {/* {errors.photo_url && (
          <p className="errorMsg">{errors.photo_url.message}</p>
        )} */}

        <input
          type="number"
          name="hourly_fee"
          placeholder="Hourly fee $$"
          onKeyDown={(evt) =>
            ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
          }
          {...register("hourly_fee", {
            required: {
              value: true,
              message: "Hourly fee is a required field",
            },
            min: {
              value: 0,
              message: "Hourly fee must be greater than 0",
            },
            max: {
              value: 50,
              message: "Hourly fee can not be greater than 50",
            },
          })}
        />

        {/* {errors.hourly_fee && (
          <p className="errorMsg">{errors.hourly_fee.message}</p>
        )} */}

        <input
          type="number"
          name="experience"
          placeholder="Exp (years)"
          onKeyDown={(evt) =>
            ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
          }
          {...register("experience", {
            required: {
              value: true,
              message: "Experience is a required field",
            },
            min: {
              value: 0,
              message: "Experience must be greater than 0",
            },
            max: {
              value: 50,
              message: "Experience can not be greater than 50",
            },
          })}
        />

        {/* {errors.experience && (
          <p className="errorMsg">{errors.experience.message}</p>
        )} */}

        <input
          type="input"
          name="ig_link"
          placeholder="https://www.instagram.com/your_page"
          {...register("ig_link", {
            pattern: {
              value:
                /(http(s)?:\/\/)?(www\.)?instagram\.com\/([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)\/?/i,
              message: "Please add a valid link for the instagram profile",
            },
          })}
        />

        {/* {errors.ig_link && <p className="errorMsg">{errors.ig_link.message}</p>} */}
        <input
          type="input"
          name="twitter_link"
          placeholder="https://twitter.com/your_page"
          {...register("twitter_link", {
            pattern: {
              value:
                /(http(s)?:\/\/)?(www\.)?twitter\.com\/[A-z 0-9 _]{1,15}\/?/i,
              message: "Please add a valid link for the twitter profile",
            },
          })}
        />
        {/* {errors.twitter_link && (
          <p className="errorMsg">{errors.twitter_link.message}</p>
        )} */}

        <input
          type="input"
          name="fb_link"
          placeholder="https://www.facebook.com/your_page"
          {...register("fb_link", {
            pattern: {
              value:
                /(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w]*\/)*([\w]*)/i,
              message: "Please add a valid link for the facebook profile",
            },
          })}
        />

        {/* {errors.fb_link && <p className="errorMsg">{errors.fb_link.message}</p>} */}

        <textarea
          type="text"
          name="description"
          placeholder="Please introduce yourself"
          {...register("description", {
            required: {
              value: true,
              message: "Description is a required field",
            },
            minLength: {
              value: 20,
              message: "Description must have a minimum of 20 characters",
            },
            maxLength: {
              value: 120,
              message: "Description can only have a maximum of 120 characters",
            },
          })}
        />

        {/* {errors.description && (
          <p className="errorMsg">{errors.description.message}</p>
        )} */}

        <ul className="error-messages">
          {errors.first_name && (
            <li className="errorMsg">{errors.first_name.message}</li>
          )}

          {errors.last_name && (
            <li className="errorMsg">{errors.last_name.message}</li>
          )}

          {errors.photo_url && (
            <li className="errorMsg">{errors.photo_url.message}</li>
          )}

          {errors.description && (
            <li className="errorMsg">{errors.description.message}</li>
          )}

          {errors.hourly_fee && (
            <li className="errorMsg">{errors.hourly_fee.message}</li>
          )}

          {errors.experience && (
            <li className="errorMsg">{errors.experience.message}</li>
          )}

          {errors.ig_link && (
            <li className="errorMsg">{errors.ig_link.message}</li>
          )}

          {errors.twitter_link && (
            <li className="errorMsg">{errors.twitter_link.message}</li>
          )}

          {errors.fb_link && (
            <li className="errorMsg">{errors.fb_link.message}</li>
          )}
        </ul>

        <button type="submit" name="additem" className="session-btn">
          Add tutor
        </button>
      </form>

      <div
        className="overlay"
        style={{
          display: overlay ? "flex" : "none",
        }}
      >
        <p>{returnMsg.message}</p>
      </div>

      <div className={`popup-message ${overlay ? '' : 'hidden'}`}>
        <p>Tutor has been created successfully!</p>
      </div>
    </section>
  );
};

export default AddTutor;

import React, { useState } from "react";
import { RenderInput } from "../../../components/common/FormField";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addArticle } from "../../../Redux/ArticleSlice";
import { useNavigate } from "react-router-dom";

export default function AddArticle() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    mode: "all",
  });
  const dispatch = useDispatch();
  const navigation = useNavigate();

  console.log(errors);
  const [image, setImage] = useState("");

  const onSubmit = (data) => {
    // console.log("data", data);

    if (data) {
      const { title, content, testPhotos } = data;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("picture", testPhotos[0], testPhotos[0].name);
      dispatch(addArticle(formData))
        .then((res) => {
          alert(res?.message);
          navigation("/article-management");
        })
        .catch((err) => alert(err));
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-self-center ">
          <div className="card p-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h4 className="col-sm-12 card-title">Article Add Management</h4>
              <div className="col-md-6">
                <input
                  type="file"
                  style={{ marginBlock: 10 }}
                  accept="image/*"
                  {...register("testPhotos", {
                    required: "image Required",
                  })}
                  onChange={(e) => {
                    setImage(window.URL.createObjectURL(e.target.files[0]));
                  }}
                />
              </div>
              <div className="col-md-6">
                {!image && errors?.testPhotos && (
                  <span style={{ color: "#e55353" }}>
                    {errors?.testPhotos?.message}
                  </span>
                )}
                {image && (
                  <img
                    style={{ height: 100, width: 100, marginBlock: 5 }}
                    src={image}
                  />
                )}
              </div>
              <div className="col-md-8">
                <RenderInput
                  // labelName={"Email"}
                  outerStyle={false}
                  name="title"
                  type="text"
                  id="addArticle"
                  style={{ marginBlock: 15 }}
                  register={{
                    ...register("title", {
                      required: "Title required",
                      minLength: {
                        value: 2,
                        message: "Title must be at least 2 characters",
                      },
                      // validate: () => handleEmailValidation(email, errors),
                    }),
                  }}
                  // onChange={(e) => handleOnchange(e)}
                  errors={errors}
                  placeholder="Title"
                />
              </div>
              <div className="col-md-8">
                <textarea
                  name="content"
                  className="form-control"
                  {...register("content", {
                    required: "content Required",
                    minLength: {
                      value: 2,
                      message: "Content must be at least 2 characters",
                    },
                  })}
                  placeholder="content"
                  type="text"
                />
                {errors?.content && (
                  <div>
                    <span style={{ color: "#e55353" }}>
                      {errors?.content?.message}
                    </span>
                  </div>
                )}
              </div>

              <input className="col-md-4 mt-3" type="submit" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

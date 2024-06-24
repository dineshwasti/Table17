import React, { useState } from "react";
import formData from "../form.json";
import formData2 from "../form2.json";

type PostFormData = {
  jilla: string;
  gabisha: string;
  ban_ko_nam: string;
  plot_number: string;
  plot_ko_prakar: string;
  plot_ko_size: string;
  miti: string;
  mohada: string;
  akshyansha: string;
  desantar: string;
  uchai: string;
  bhiralopan: string;
  ban_ko_prakar: string;
  mato_ko_rang: string;
  mukhya_prajati: string;
  mato_ko_banawat: string;
  comData: PostFormData2[];
};

type PostFormData2 = {
  staniya: string;
  naam: string;
  cluster: string;
  tilar: string;
  uchai: string;
  taja: string;
  sukeko: string;
};

const initialPostFormData: PostFormData = {
  jilla: "",
  gabisha: "",
  ban_ko_nam: "",
  plot_number: "",
  plot_ko_prakar: "",
  plot_ko_size: "",
  miti: "",
  mohada: "",
  akshyansha: "",
  desantar: "",
  uchai: "",
  bhiralopan: "",
  ban_ko_prakar: "",
  mato_ko_rang: "",
  mukhya_prajati: "",
  mato_ko_banawat: "",
  comData: [],
};

const initialState: PostFormData2[] = [...Array(6)].map(() => ({
  staniya: "",
  naam: "",
  cluster: "",
  tilar: "",
  uchai: "",
  taja: "",
  sukeko: "",
}));

export default function NewForm() {
  const [postformData, setFormData] =
    useState<PostFormData>(initialPostFormData);
  const [postformData2, setFormData2] = useState<PostFormData2[]>(initialState);

  const newData = () => {
    const inputData2: { title: string; name: string }[] = [];
    formData2.forEach((item) => {
      if (item.name !== "sn") {
        if (item.sub) {
          item.sub.forEach((subItem) => {
            inputData2.push({ title: subItem.title, name: subItem.name });
          });
        } else {
          inputData2.push({ title: item.title, name: item.name });
        }
      }
    });
    return inputData2;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...postformData,
      [name]: value,
    });
  };

  const handleInputChange2 = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    name: string
  ) => {
    const value = event.target.value;
    const updatedData = [...postformData2];
    updatedData[rowIndex] = {
      ...updatedData[rowIndex],
      [name]: value,
    };
    setFormData2(updatedData);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    setFormData({
      ...postformData,
      comData: postformData2,
    });

    fetch("http://localhost:4000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postformData), // Send the form data in the body of the POST request
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Form Submitted Successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={onSubmit} method="get">
      <table>
        <thead>
          <tr>
            <th colSpan={6}>
              तालिका १५: फल, फूल, बीउ प्रयोग हुने झाडी वर्गका गैरकाष्ठ वन
              पैदावारको लागि सर्वेक्षण फारम
            </th>
          </tr>
        </thead>
        <tbody>
          {formData.map((item, index) => (
            <tr key={index}>
              {item.map((formItem, i) => (
                <React.Fragment key={i}>
                  <td>{formItem.title}</td>
                  <td colSpan={item.length === 2 ? 2 : 1}>
                    <input
                      type="text"
                      name={formItem.name}
                      value={
                        (postformData as any)[
                          formItem.name as keyof PostFormData
                        ] || ""
                      }
                      onChange={handleInputChange}
                    />
                  </td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <table>
        <thead>
          <tr>
            {formData2.map((item, index) => (
              <th
                key={index}
                rowSpan={index + 1 === formData2.length ? 1 : 2}
                colSpan={index + 1 === formData2.length ? 2 : 1}
              >
                {item.title}
              </th>
            ))}
          </tr>
          <tr>
            {formData2[formData2.length - 1].sub?.map((item, index) => (
              <th key={index}>{item.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(6)].map((_, firstIndex) => (
            <tr key={firstIndex}>
              <td>{firstIndex + 1}</td>
              {newData().map((item, index) => (
                <td key={index}>
                  <input
                    type="text"
                    name={`${firstIndex}-${item.name}`}
                    value={
                      postformData2[firstIndex]
                        ? postformData2[firstIndex][
                            item.name as keyof PostFormData2
                          ]
                        : ""
                    }
                    onChange={(e) =>
                      handleInputChange2(e, firstIndex, item.name)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <input type="submit" value="Submit the form" className="btn" />
    </form>
  );
}

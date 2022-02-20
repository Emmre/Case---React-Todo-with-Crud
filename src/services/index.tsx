import axios from "axios";

export const getAllTodo = () => {
  const data = axios
    .get("http://localhost:3000/posts/")
    .then((res) => res.data);
  return data;
};

export const postTodo = (postData: any) => {
  const { id, title, isCompleted } = postData;
  const data = axios.post("http://localhost:3000/posts/", {
    id,
    title,
    isCompleted,
  });
  return data;
};

export const deleteTodo = (id: number) => {
  const data = axios.delete(`http://localhost:3000/posts/${id}`);
  return data;
};

export const updateTodo = (item) => {
  const { id, isCompleted } = item;
  const data = axios.put(`http://localhost:3000/posts/${id}/`, {
    ...item,
    isCompleted: !isCompleted,
  });

  return data;
};

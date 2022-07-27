import { useState } from "react";
import { useSelector } from "react-redux";
const NewTicket = () => {
  const { user } = useSelector((state) => state.auth);
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="heading">
        <h1>Create new ticket</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" defaultValue={user.name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="name">Customer email</label>
          <input type="text" defaultValue={user.email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => {
                setProduct(e.target.value);
              }}
            >
              <option value="iPhone">Iphone</option>
              <option value="Macbook Pro">Macbook Pro</option>
              <option value="iPad">Ipad</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of issue</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewTicket;

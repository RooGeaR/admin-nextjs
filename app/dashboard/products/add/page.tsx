import Button from "@/app/ui/button/button";
import styles from "@/app/ui/dashboard/products/addProduct/addProduct.module.css";
const AddProductPage = () => {
  return (
    <div className={styles.container}>
      <form action="" className={styles.form}>
        <input type="text" placeholder="Title" name="title" required />
        <select name="cat" id="cat">
          <option value="general">Choose a category</option>
          <option value="kitchen">Kitchen</option>
          <option value="phone">Phone</option>
          <option value="computer">Computer</option>
        </select>
        <input type="number" placeholder="Price" name="price" />
        <input type="number" placeholder="Stock" name="stock" />
        <input type="text" placeholder="Color" name="color" />
        <input type="text" placeholder="Size" name="Size" />
        <textarea
          name="desc"
          id="desc"
          rows={16}
          placeholder="Description"
        ></textarea>
        <Button title="Add" type="submit" style={{padding: '30px'}}/>
      </form>
    </div>
  );
};

export default AddProductPage;

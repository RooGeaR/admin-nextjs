import styles from "@/app/ui/dashboard/products/singleProduct/singleProduct.module.css";
import Image from "next/image";

const SingleProductPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={`/noproduct.jpg`} alt="" fill />
        </div>
        IPhone
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <label htmlFor="">Title</label>
          <input type="text" name="title" placeholder="IPhone" />
          <label htmlFor="">Category</label>
          <select name="cat" id="cat">
            <option value="general">Choose a category</option>
            <option value="kitchen">Kitchen</option>
            <option value="phone" selected>Phone</option>
            <option value="computer">Computer</option>
          </select>
          <label htmlFor="">Price</label>
          <input type="number" name="price" placeholder="2000" />
          <label htmlFor="">Stock</label>
          <input type="number" name="stock" placeholder="5" />
          <label htmlFor="">Color</label>
          <input type="text" name="color" placeholder="white" />
          <label htmlFor="">Size</label>
          <input type="text" name="size" placeholder="10 x 18" />
          <label htmlFor="">Description</label>
          <textarea
            name="desc"
            id="desc"
            rows={16}
            placeholder="IPhone 10 color white"
          ></textarea>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleProductPage;

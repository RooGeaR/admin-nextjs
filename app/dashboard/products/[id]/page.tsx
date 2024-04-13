import styles from "@/app/ui/dashboard/products/singleProduct/singleProduct.module.css";
import Image from "next/image";
import Button from "@/app/ui/button/button";
import { fetchProduct } from "@/app/lib/data";

interface IProductPage {
  params: { id: string }
}

const SingleProductPage = async ({ params }: IProductPage) => {
  const { id } = params
  const product = await fetchProduct(id)
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={product.img || `/noproduct.jpg`} alt="" fill />
        </div>
        {product.title}
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <input type="hidden" name="id" value={product.id}/>
          <label htmlFor="">Title</label>
          <input type="text" name="title" placeholder={product.title} />
          <label htmlFor="">Category</label>
          <select name="cat" id="cat">
            <option value="general">Choose a category</option>
            <option value="kitchen">Kitchen</option>
            <option value="phone">Phone</option>
            <option value="computer">Computer</option>
          </select>
          <label htmlFor="">Price</label>
          <input type="number" name="price" placeholder={product.price} />
          <label htmlFor="">Stock</label>
          <input type="number" name="stock" placeholder={product.stock} />
          <label htmlFor="">Color</label>
          <input type="text" name="color" placeholder={product.color} />
          <label htmlFor="">Size</label>
          <input type="text" name="size" placeholder={product.size} />
          <label htmlFor="">Description</label>
          <textarea
            name="desc"
            id="desc"
            rows={16}
            placeholder={product.desc}
          ></textarea>
          <Button title="Update" type="submit" style={{ marginTop: "20px" }} />
        </form>
      </div>
    </div>
  );
};

export default SingleProductPage;

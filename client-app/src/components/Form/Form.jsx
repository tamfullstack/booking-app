import styles from "./Form.module.css";

const Form = () => {
  return (
    <div className="bg-dark text-light">
      <div className={`${styles.form} container`}>
        <h1 className={styles.title}>Save time, save money!</h1>
        <p className={styles.subtitle}>
          Sign up and we'll send the best deals to you
        </p>
        <form className={styles.content}>
          <input
            className={styles.input}
            type="email"
            placeholder="Your Email"
          />
          <button className={`${styles.submit} btn-primary`}>Subcribes</button>
        </form>
      </div>
    </div>
  );
};

export default Form;

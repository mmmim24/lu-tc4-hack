import Layout from "../components/Layout";
import Product from '../components/products/product'
import React from "react";
import productImg from '../static/dokkaebi.png'
import { Field, Formik, Form } from "formik"; 
import { Upload, Button, Progress, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { storage } from "../firebase";
import firebase from "firebase";


export default () => {
    

    // sort by highest bid
    // sort by rating ( including negative rating )
    // if consecutive reviews all negative suspend user
    // user can drop the product at our warehouse or request us to collect it from  him/her
    // fremium user posts will expire within 5days premium users posts will expire within 1 year

    const [uploadState, setUploadState] = React.useState({
        UploadStart: false,
        uploadProgress: 0,
        uploadError: false,
        uploadFileUrl: ""
    })  

    return (
        <Layout>
            <div className="grid relative grid-cols-4">
                <div style={{fontSize: '4em'}} className="my-16 flex items-center text-right col-span-1">Add Product</div>
                <div className="col-span-3">
                    <Formik
                        initialValues={{
                            title: '',
                            description: '',
                            minimum_bid: '',
                            images: [],
                        }}
                        onSubmit={ values => {
                            console.log(values)
                        } }
                    >
                        <Form>
                        <div className="mt-20 grid grid-cols-5 ml-16 gap-y-8">
                            <div className="row-start-1 col-span-1 text-lg">Product Title</div>
                            <Field name="title" className="px-4 py-2 row-start-1 col-span-2 border border-black rounded-lg" />
                            <div className="row-start-2 col-span-1 text-lg">Product Description</div>
                            <Field type="textarea" name="description" form="product_add_form" className="px-4 py-2 row-start-2 col-span-2 border border-black rounded-lg" />
                            <div className="row-start-3 col-span-1 text-lg">Minimum Bid</div>
                            <Field type="number" name="minimum_bid" className="px-4 py-2 row-start-3 col-span-2 border border-black rounded-lg" />
                            <div className="row-start-4 col-span-1 text-lg">Product Images</div>
                            <div className="row-start-4 col-span-2" >
                            <Upload
                                name="file"
                                // eslint-disable-next-line no-undef
                                customRequest={data => {

                                    const ref = storage
                                        .ref('product_images')
                                        .child(`${new Date().getTime()}`);

                                    const task = ref.put(data.file);
                                    task.on(
                                        firebase.storage.TaskEvent.STATE_CHANGED,
                                        snapshot => {
                                            const progress = Math.round(
                                                (100 * snapshot.bytesTransferred) / snapshot.totalBytes
                                            );
                                            setUploadState({
                                                uploadError: false,
                                                uploadStart: true,
                                                uploadProgress: progress,
                                            });
                                        },
                                        error => {
                                            // Handle error during the upload
                                            console.log(error)
                                            setUploadState({
                                                uploadStart: false,
                                                uploadError: error,
                                            });
                                        },
                                        () => {
                                        task.snapshot.ref
                                            .getDownloadURL()
                                            .then(downloadURL => {
                                                setUploadState({
                                                    uploadFileUrl: downloadURL,
                                                    UploadSuccess: true,
                                                    uploadStart: false,
                                                });    
                                            });
                                        }
                                    );
                                    }}
                                >
                                    
                                    <Button>
                                        <UploadOutlined /> Click to Upload
                                    </Button>
                                    {uploadState.uploadStart && (
                                        <Progress type="line" percent={uploadState.uploadProgress} />
                                    )}
                                    {uploadState.uploadError && message.error('an error occured')}
                                </Upload>
                            </div>
                            <button className="row-start-5 py-2 rounded-lg" type="submit" >submit</button>
                        </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </Layout>
    );
};


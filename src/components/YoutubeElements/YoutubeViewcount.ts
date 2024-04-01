const formatViewcount = (viewcount: string) => {
    return viewcount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default formatViewcount;

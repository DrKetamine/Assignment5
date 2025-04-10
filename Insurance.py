import streamlit as st
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("insurance_dataset.csv")

st.title("Insurance Data Explorer")

age = st.slider("Select Age Range", int(df.Age.min()), int(df.Age.max()), (25, 40))
gender = st.selectbox("Select Gender", ["All"] + list(df.Gender.unique()))

filtered_df = df[(df['Age'] >= age[0]) & (df['Age'] <= age[1])]
if gender != "All":
    filtered_df = filtered_df[filtered_df['Gender'] == gender]

st.write(f"Displaying {len(filtered_df)} records")
st.dataframe(filtered_df)

st.subheader("Age vs Annual Premium")
fig, ax = plt.subplots()
sns.scatterplot(x="Age", y="Annual_Premium", data=filtered_df, ax=ax)
st.pyplot(fig)
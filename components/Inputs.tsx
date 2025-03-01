"use client";
import { SuccessModal } from "@/layouts/Modals/MessageModals";
import { useAuth } from "@/lib/Context/AuthContext";
import { LOCALHOST } from "@/lib/variebles";
import { FormEvent, useEffect, useRef, useState, ChangeEvent } from "react";

type HobbyType = {
  id: number;
  name: string;
};

export const InputWithLiveFetch = ({
  inputName,
  liveFetchAddress,
  placeholder,
  label,
  fetchAddress,
}: {
  inputName: string;
  liveFetchAddress: string;
  placeholder: string;
  label: string;
  fetchAddress: string;
}) => {
  const [data, setData] = useState<HobbyType[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const fetchKeywords = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setData([]);
      return;
    }

    const res = await fetch(LOCALHOST + liveFetchAddress, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: e.target.value }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data from offer hook!");
    }

    const _data = await res.json();
    setData(_data);
  };

  const { accessToken } = useAuth()

  const handleDataSubmission = async (inputValue: string) => {
    console.log(inputValue);
    const token = accessToken

    const res = await fetch(LOCALHOST + fetchAddress, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: inputValue }),
    });

    if (res.ok) {
      setSuccess(true);
    }
  };

  return (
    <>
      <div className="w-full mt-3">
        <label htmlFor={inputName}>{label}:‌</label>
        <input
          type="text"
          ref={inputRef}
          name={inputName}
          onChange={fetchKeywords}
          placeholder={placeholder}
          className="rounded-lg border p-3 w-full outline-brown-normal"
        />
      </div>
      <div className="flex w-full p-2">
        {data.length > 0
          ? data.map((d) => (
              <button
                key={d.id}
                onClick={() => handleDataSubmission(d.name)}
                className="p-3 rounded-full bg-blue-400 text-white block m-3"
              >
                {d.name}
              </button>
            ))
          : inputRef.current?.value.length
          ? (
              <button
                onClick={() => handleDataSubmission(inputRef.current!.value)}
                className="p-3 rounded-full bg-blue-400 text-white block m-3"
              >
                {inputRef.current?.value}
              </button>
            )
          : null}
      </div>
      <SuccessModal title={""} description={"با موفقیت اضافه شد"} state={success} />
    </>
  );
};

export const SelectWithLiveFetch = ({
  defaultValue,
  liveFetchAddress,
  label,
}: {
  defaultValue: string | null;
  liveFetchAddress: string;
  label: string | null;
}) => {
  const [data, setData] = useState<HobbyType[]>([]);

  useEffect(() => {
    const handleFetch = async () => {
      const res = await fetch(LOCALHOST + liveFetchAddress, {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const _data = await res.json();
      setData(_data);
    };

    handleFetch();
  }, [liveFetchAddress]); // Removed `SelectWithLiveFetch` from dependencies

  return (
    <select className="w-full form-control mt-2">
      <option value="default">{defaultValue ? defaultValue : "انتخاب کنید"}</option>
      {data.map((option) => (
        <option key={option.id}>{option.name}</option>
      ))}
    </select>
  );
};

import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { useProjects } from "../../../hooks/useProjects";

import type { Project } from "../../../@types";
import { ToastTryAgain } from "../../../utils/toasts";
import colors from "../../../styles/colors";
import { useAuth } from "../../../hooks/useAuth";

interface FormStateProps {
  project?: Project;
  close: () => void;
}

function useFormState({ project, ...props }: FormStateProps) {
  const [name, setName] = useState(project?.name ?? "Projeto: ");
  const [description, setDescription] = useState(project?.description ?? "");
  const [color, setColor] = useState("");
  const [colorInt, setColorInt] = useState(0);

  const create = useProjects((value) => value.create);
  const update = useProjects((value) => value.update);
  const user = useAuth((value) => value.user);

  useEffect(() => {
    if (project?.color) {
      setColor(`#${project?.color?.toString(16)}`);
    } else {
      setColor(colors.purple);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setColorInt(parseInt(color.slice(1), 16));
  }, [color]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data: Project = {};
    let operation;

    if (project) {
      if (name !== project.name) data.name = name;
      if (description !== project.description) data.description = description;
      if (colorInt !== project.color) data.color = colorInt;

      operation = () => update(project?.id, data);
    } else {
      data = {
        name,
        description,
        color: colorInt,
        created_at: new Date(),
        user: user.id,
      };

      operation = () => create(data);
    }

    try {
      toast.promise(operation(), {
        pending: "Salvando...",
        success: "Tudo certo 🦄",
        error: "Ah não! Verifique os dados 🤯",
      });

      props.close();
    } catch (err) {
      console.error(err);
      ToastTryAgain();
    }
  };

  return {
    name: { state: name, set: setName },
    description: { state: description, set: setDescription },
    color: { state: color, set: setColor },
    onSubmit,
  };
}

export default useFormState;

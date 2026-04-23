import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "@/components/ui/modal/Modal";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

const CATEGORY_OPTIONS = [
  "",
  "Semillas",
  "Frutos secos",
  "Suplementos",
  "Tinturas",
] as const;

export interface NewProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Called after a successful submit (before closing). */
  onRegistered?: (payload: NewProductFormValues) => void;
}

export interface NewProductFormValues {
  name: string;
  category: string;
  sku: string;
  price: string;
  stock: string;
}

const defaultValues: NewProductFormValues = {
  name: "",
  category: "",
  sku: "",
  price: "",
  stock: "",
};

export function NewProductModal({
  open,
  onOpenChange,
  onRegistered,
}: NewProductModalProps) {
  const formId = useId();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewProductFormValues>({ defaultValues });

  useEffect(() => {
    if (open) reset(defaultValues);
  }, [open, reset]);

  function onSubmit(values: NewProductFormValues) {
    onRegistered?.(values);
    reset(defaultValues);
    onOpenChange(false);
  }

  const inputClass =
    "w-full border-none bg-surface-container-highest rounded-xl px-4 py-3.5 text-on-surface placeholder:text-outline transition-all focus:ring-2 focus:ring-secondary/40";

  return (
    <Modal
      open={open}
      onOpenChange={(next) => {
        if (!next) reset(defaultValues);
        onOpenChange(next);
      }}
      title="Nuevo Producto"
      description="Agrega un nuevo producto al catálogo."
      footer={
        <div className="flex items-center justify-end gap-4">
          <Dialog.Close asChild>
            <button
              type="button"
              className="rounded-xl px-8 py-3 font-bold text-primary transition-all hover:bg-surface-container-high active:scale-95"
            >
              Cancelar
            </button>
          </Dialog.Close>
          <button
            type="submit"
            form={formId}
            className="rounded-xl bg-gradient-to-br from-secondary to-on-secondary-container px-10 py-3.5 font-bold text-white shadow-lg shadow-secondary/20 transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
          >
            Registrar Producto
          </button>
        </div>
      }
    >
      <form
        id={formId}
        className="space-y-8"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div
          role="button"
          tabIndex={0}
          aria-label="Subir imagen del producto"
          className="group cursor-pointer rounded-2xl border-2 border-dashed border-outline-variant p-12 text-center transition-all hover:border-secondary hover:bg-secondary-container/10"
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") e.preventDefault();
          }}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-high text-secondary transition-transform group-hover:scale-110">
              <MaterialIcon name="add_photo_alternate" className="text-3xl" />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-bold text-primary">
                Arrastra y suelta la imagen del producto
              </p>
              <p className="text-sm text-on-surface-variant">
                PNG, JPG o WebP hasta 10MB
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 space-y-2">
            <label
              htmlFor={`${formId}-name`}
              className="ml-1 text-sm font-bold text-on-surface-variant"
            >
              Nombre del Producto
            </label>
            <input
              id={`${formId}-name`}
              className={inputClass}
              placeholder="e.g. Polen de Algarrobo"
              type="text"
              autoComplete="off"
              {...register("name", { required: "Obligatorio" })}
            />
            {errors.name ? (
              <p className="ml-1 text-xs font-medium text-error">
                {errors.name.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label
              htmlFor={`${formId}-category`}
              className="ml-1 text-sm font-bold text-on-surface-variant"
            >
              Categoría
            </label>
            <div className="relative">
              <select
                id={`${formId}-category`}
                className={`${inputClass} appearance-none`}
                {...register("category", {
                  validate: (v) => v !== "" || "Elegí una categoría",
                })}
              >
                {CATEGORY_OPTIONS.map((opt) =>
                  opt === "" ? (
                    <option key="placeholder" value="">
                      Selecciona una categoría
                    </option>
                  ) : (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ),
                )}
              </select>
              <MaterialIcon
                name="expand_more"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-outline"
              />
            </div>
            {errors.category ? (
              <p className="ml-1 text-xs font-medium text-error">
                {errors.category.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label
              htmlFor={`${formId}-sku`}
              className="ml-1 text-sm font-bold text-on-surface-variant"
            >
              Código de Barras
            </label>
            <input
              id={`${formId}-sku`}
              className={inputClass}
              placeholder="0000000000000"
              type="text"
              autoComplete="off"
              {...register("sku")}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor={`${formId}-price`}
              className="ml-1 text-sm font-bold text-on-surface-variant"
            >
              Precio por kg/unidad
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-medium text-outline">
                $
              </span>
              <input
                id={`${formId}-price`}
                className={`${inputClass} pl-8`}
                placeholder="10.00"
                type="number"
                min={0}
                step="0.01"
                {...register("price")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor={`${formId}-stock`}
              className="ml-1 text-sm font-bold text-on-surface-variant"
            >
              Stock Inicial
            </label>
            <input
              id={`${formId}-stock`}
              className={inputClass}
              placeholder="100"
              type="number"
              min={0}
              step="1"
              {...register("stock")}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}

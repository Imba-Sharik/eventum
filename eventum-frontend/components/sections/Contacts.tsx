"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import dynamic from "next/dynamic";
import type { ContactInfo } from "@/lib/types";
import { submitContactForm } from "@/lib/strapi";

// Динамический импорт карты (чтобы избежать SSR проблем)
const Map = dynamic(() => import("@/components/shared/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-75 rounded-lg bg-gray-100 flex items-center justify-center">
      <p className="text-gray-500">Загрузка карты...</p>
    </div>
  ),
});

const formSchema = z.object({
  email: z.string().email("Введите корректный email"),
  services: z.array(z.string()).min(1, "Выберите хотя бы одну услугу"),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactsProps {
  data: ContactInfo;
}

export default function Contacts({ data }: ContactsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      services: [],
    },
  });

  const onSubmit = async (formData: FormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitContactForm(formData);

      setSubmitSuccess(true);
      form.reset();

      // Скрыть сообщение об успехе через 5 секунд
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(error instanceof Error ? error.message : "Произошла ошибка");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacts" className="relative bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Заголовок */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-4">
            Уведомления по электронной почте и контактная информация
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Форма */}
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-normal text-gray-900">
                        Email Address *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email Address"
                          className="h-11 text-base border-gray-300 rounded-md focus:border-gray-900 focus:ring-gray-900"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="services"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-sm font-normal text-gray-900 block">
                        Интересующие услуги *
                      </FormLabel>
                      <div className="space-y-2">
                        {data.serviceOptions?.map((service) => (
                          <FormField
                            key={service.serviceId}
                            control={form.control}
                            name="services"
                            render={({ field }) => {
                              return (
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id={service.serviceId}
                                    checked={field.value?.includes(service.serviceId)}
                                    onCheckedChange={(checked) => {
                                      const newValue = checked
                                        ? [...(field.value || []), service.serviceId]
                                        : (field.value || []).filter(
                                            (value) => value !== service.serviceId,
                                          );
                                      field.onChange(newValue);
                                    }}
                                  />
                                  <label
                                    htmlFor={service.serviceId}
                                    className="text-base text-gray-900 cursor-pointer select-none"
                                  >
                                    {service.label}
                                  </label>
                                </div>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {submitSuccess && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-green-800 text-sm">
                      Спасибо! Ваша заявка успешно отправлена.
                    </p>
                  </div>
                )}

                {submitError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-800 text-sm">{submitError}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-10 py-3 bg-gray-900 text-white font-normal text-base rounded-md hover:bg-gray-800"
                >
                  {isSubmitting ? "Отправка..." : "Отправить"}
                </Button>
              </form>
            </Form>
          </div>

          {/* Контактная информация */}
          <div>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              Вопросы в отдел по связям с партнерами можно отправлять по
              электронной почте{" "}
              <a
                href={`mailto:${data.email}`}
                className="text-gray-900 hover:underline font-medium"
              >
                {data.email}
              </a>{" "}
              или нажав на кнопку ниже
            </p>

            <Button
              asChild
              variant="outline"
              className="px-8 py-3 border-2 border-gray-900 text-gray-900 font-normal text-base rounded-md hover:bg-gray-900 hover:text-white"
            >
              <a href={`mailto:${data.email}`}>Связаться</a>
            </Button>
          </div>
        </div>

        {/* Карта на всю ширину */}
        <div className="mt-12">
          {/* Адрес */}
          <div className="mb-6">
            <p className="text-lg md:text-xl text-gray-900 font-medium">
              {data.address}
            </p>
          </div>

          <Map
            latitude={data.latitude}
            longitude={data.longitude}
            address={data.address}
          />

          {/* Контакты и соц. сети под картой */}
          <div className="mt-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Телефон */}
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href={`tel:${data.phone?.replace(/\D/g, "")}`}
                  className="text-lg text-gray-900 hover:text-gray-600 transition-colors"
                >
                  {data.phone}
                </a>
              </div>

              {/* Соц. сети */}
              <div className="flex flex-col items-start md:items-end gap-2">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 font-medium">
                    Мы в соцсетях:
                  </span>
                  <div className="flex items-center gap-4">
                    {data.socialLinks?.map((social) => (
                      <a
                        key={social.platform}
                        href={social.url}
                        className="text-gray-900 hover:text-gray-600 transition-colors"
                        aria-label={social.platform}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SocialIcon platform={social.platform} />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Дисклеймер */}
                <p className="text-xs text-gray-500">
                  *Meta — организация, запрещённая на территории РФ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Компонент для иконок соцсетей
function SocialIcon({ platform }: { platform: string }) {
  const icons: Record<string, React.ReactNode> = {
    vk: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.441 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.711 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.644v3.473c0 .373.169.508.271.508.22 0 .407-.135.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.644-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.491-.085.744-.576.744z" />
      </svg>
    ),
    telegram: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
      </svg>
    ),
    instagram: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  };

  return icons[platform] || null;
}
